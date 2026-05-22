const { z } = require("zod");
const {
  requiredEmail,
  requiredLimitedText,
  requiredText,
} = require("./common.validation");

function strongPassword(fieldName) {
  return z.preprocess(
    (value) => String(value || ""),
    z
      .string()
      .min(8, `${fieldName} must be at least 8 characters.`)
      .regex(/[A-Z]/, `${fieldName} must include an uppercase letter.`)
      .regex(/[a-z]/, `${fieldName} must include a lowercase letter.`)
      .regex(/\d/, `${fieldName} must include a number.`)
      .regex(/[^A-Za-z0-9]/, `${fieldName} must include a special character.`)
  );
}

const signupSchema = z.object({
  name: requiredLimitedText("name", 100),
  email: requiredEmail(),
  password: strongPassword("password"),
});

const loginSchema = z.object({
  email: requiredEmail(),
  password: requiredText("password"),
});

const forgotPasswordSchema = z.object({
  email: requiredEmail(),
});

const otpSchema = z.preprocess(
  (value) => String(value || "").trim(),
  z.string().regex(/^\d{6}$/, "otp must be a 6-digit code.")
);

const verifyResetOtpSchema = z.object({
  email: requiredEmail(),
  otp: otpSchema,
});

const verifyEmailSchema = z.object({
  email: requiredEmail(),
  otp: otpSchema,
});

const resetPasswordSchema = z.object({
  email: requiredEmail(),
  newPassword: strongPassword("newPassword"),
});

module.exports = {
  forgotPasswordSchema,
  loginSchema,
  resetPasswordSchema,
  signupSchema,
  verifyEmailSchema,
  verifyResetOtpSchema,
};
