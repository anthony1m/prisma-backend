const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const emailVerificationRepository = require("../repositories/emailVerification.repository");
const passwordResetRepository = require("../repositories/passwordReset.repository");
const userRepository = require("../repositories/user.repository");
const { sendMail } = require("../utils/mailer");

const EMAIL_VERIFICATION_MESSAGE =
  "User created successfully. Please verify your email with the OTP sent to your inbox.";
const PASSWORD_RESET_SAFE_MESSAGE =
  "If an account exists with this email, a password reset OTP has been sent.";
const INVALID_OTP_MESSAGE = "Invalid or expired OTP.";
const INVALID_CREDENTIALS_MESSAGE = "Invalid credentials";
const INVALID_EMAIL_MESSAGE = "Email is incorrect.";
const EMAIL_NOT_VERIFIED_MESSAGE = "Email is not verified.";
const PASSWORD_STRENGTH_MESSAGE =
  "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.";

function createError(message, statusCode) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function generateOtp() {
  return crypto.randomInt(100000, 1000000).toString();
}

function otpExpiryMinutes() {
  return Number(process.env.PASSWORD_RESET_OTP_MINUTES || 3);
}

function otpExpiryDate() {
  return new Date(Date.now() + otpExpiryMinutes() * 60 * 1000);
}

function emailVerificationOtpExpiryMinutes() {
  return Number(process.env.EMAIL_VERIFICATION_OTP_MINUTES || 3);
}

function emailVerificationOtpExpiryDate() {
  return new Date(Date.now() + emailVerificationOtpExpiryMinutes() * 60 * 1000);
}

function passwordIsStrong(password) {
  return (
    typeof password === "string" &&
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /\d/.test(password) &&
    /[^A-Za-z0-9]/.test(password)
  );
}

async function sendPasswordResetOtpEmail(email, otp) {
  await sendMail({
    to: email,
    subject: "Password reset OTP",
    text: `Your password reset OTP is ${otp}. It expires in ${otpExpiryMinutes()} minutes.`,
    html: `
      <p>Your password reset OTP is:</p>
      <h2>${otp}</h2>
      <p>This code expires in ${otpExpiryMinutes()} minutes.</p>
    `,
  });
}

async function sendEmailVerificationOtpEmail(email, otp) {
  await sendMail({
    to: email,
    subject: "Verify your email",
    text: `Your email verification OTP is ${otp}. It expires in ${emailVerificationOtpExpiryMinutes()} minutes.`,
    html: `
      <p>Your email verification OTP is:</p>
      <h2>${otp}</h2>
      <p>This code expires in ${emailVerificationOtpExpiryMinutes()} minutes.</p>
    `,
  });
}

async function signup(data) {
  const email = normalizeEmail(data.email);
  const existingUser = await userRepository.findByEmail(email);

  if (existingUser) {
    const error = new Error("Email already exists");
    error.statusCode = 400;
    throw error;
  }

  if (!passwordIsStrong(data.password)) {
    throw createError(PASSWORD_STRENGTH_MESSAGE, 400);
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await userRepository.createUser({
    name: data.name,
    email,
    password: hashedPassword,
    emailVerified: false,
  });

  const otp = generateOtp();
  const otpHash = await bcrypt.hash(otp, 10);

  await emailVerificationRepository.upsertOtp({
    userId: user.id,
    otpHash,
    expiresAt: emailVerificationOtpExpiryDate(),
  });

  try {
    await sendEmailVerificationOtpEmail(user.email, otp);
  } catch (error) {
    await emailVerificationRepository.deleteOtpByUserId(user.id);
    await userRepository.deleteUserById(user.id);
    throw createError("Could not send email verification OTP.", 500);
  }

  return {
    message: EMAIL_VERIFICATION_MESSAGE,
    user,
  };
}

async function login(data) {
  const user = await userRepository.findByEmail(normalizeEmail(data.email));

  if (!user) {
    const error = new Error(INVALID_CREDENTIALS_MESSAGE);
    error.statusCode = 401;
    throw error;
  }

  const passwordIsCorrect = await bcrypt.compare(data.password, user.password);

  if (!passwordIsCorrect) {
    const error = new Error(INVALID_CREDENTIALS_MESSAGE);
    error.statusCode = 401;
    throw error;
  }

  if (!user.emailVerified) {
    throw createError(EMAIL_NOT_VERIFIED_MESSAGE, 403);
  }

  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  return {
    message: "Login successful",
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      emailVerified: user.emailVerified,
    },
  };
}

async function verifyEmail(data) {
  const email = normalizeEmail(data.email);
  const user = await userRepository.findByEmail(email);

  if (!user) {
    throw createError(INVALID_OTP_MESSAGE, 400);
  }

  if (user.emailVerified) {
    await emailVerificationRepository.deleteOtpByUserId(user.id);

    return {
      message: "Email is already verified.",
    };
  }

  const verificationOtp = await emailVerificationRepository.findOtpByUserId(user.id);

  if (!verificationOtp || verificationOtp.expiresAt < new Date()) {
    await emailVerificationRepository.deleteOtpByUserId(user.id);
    throw createError(INVALID_OTP_MESSAGE, 400);
  }

  const otpIsCorrect = await bcrypt.compare(String(data.otp), verificationOtp.otpHash);

  if (!otpIsCorrect) {
    throw createError(INVALID_OTP_MESSAGE, 400);
  }

  const verifiedUser = await userRepository.markEmailVerifiedById(user.id);
  await emailVerificationRepository.deleteOtpByUserId(user.id);

  return {
    message: "Email verified successfully.",
    user: verifiedUser,
  };
}

async function forgotPassword(data) {
  const email = normalizeEmail(data.email);
  const user = await userRepository.findByEmail(email);

  if (!user) {
    return {
      message: PASSWORD_RESET_SAFE_MESSAGE,
    };
  }

  const otp = generateOtp();
  const otpHash = await bcrypt.hash(otp, 10);

  await passwordResetRepository.upsertOtp({
    userId: user.id,
    otpHash,
    expiresAt: otpExpiryDate(),
  });

  try {
    await sendPasswordResetOtpEmail(user.email, otp);
  } catch (error) {
    await passwordResetRepository.deleteOtpByUserId(user.id);
    throw createError("Could not send password reset email.", 500);
  }

  return {
    message: PASSWORD_RESET_SAFE_MESSAGE,
  };
}

async function verifyResetOtp(data) {
  const email = normalizeEmail(data.email);
  const user = await userRepository.findByEmail(email);

  if (!user) {
    throw createError(INVALID_OTP_MESSAGE, 400);
  }

  const resetOtp = await passwordResetRepository.findOtpByUserId(user.id);

  if (!resetOtp || resetOtp.expiresAt < new Date()) {
    await passwordResetRepository.deleteOtpByUserId(user.id);
    throw createError(INVALID_OTP_MESSAGE, 400);
  }

  const otpIsCorrect = await bcrypt.compare(String(data.otp), resetOtp.otpHash);

  if (!otpIsCorrect) {
    throw createError(INVALID_OTP_MESSAGE, 400);
  }

  await passwordResetRepository.markOtpVerified(user.id);

  return {
    message: "OTP verified successfully.",
    email: user.email,
  };
}

async function resetPassword(data) {
  const email = normalizeEmail(data.email);

  if (!passwordIsStrong(data.newPassword)) {
    throw createError(PASSWORD_STRENGTH_MESSAGE, 400);
  }

  const user = await userRepository.findByEmail(email);

  if (!user) {
    throw createError(INVALID_EMAIL_MESSAGE, 400);
  }

  const resetOtp = await passwordResetRepository.findOtpByUserId(user.id);

  if (!resetOtp || resetOtp.expiresAt < new Date()) {
    await passwordResetRepository.deleteOtpByUserId(user.id);
    throw createError(INVALID_OTP_MESSAGE, 400);
  }

  if (!resetOtp.verifiedAt) {
    throw createError(INVALID_OTP_MESSAGE, 400);
  }

  const hashedPassword = await bcrypt.hash(data.newPassword, 10);

  await userRepository.updatePasswordById(user.id, hashedPassword);
  await passwordResetRepository.deleteOtpByUserId(user.id);

  return {
    message: "Password reset successfully.",
  };
}

module.exports = {
  forgotPassword,
  signup,
  login,
  resetPassword,
  verifyEmail,
  verifyResetOtp,
};
