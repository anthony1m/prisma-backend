const authService = require("../services/auth.service");

async function signup(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      error: "Name, email, and password are required",
    });
  }

  const result = await authService.signup({
    name,
    email,
    password,
  });

  res.status(201).json(result);
}

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: "Email and password are required",
    });
  }

  const result = await authService.login({
    email,
    password,
  });

  res.json(result);
}

async function forgotPassword(req, res) {
  const result = await authService.forgotPassword({
    email: req.body.email,
  });

  res.json(result);
}

async function verifyEmail(req, res) {
  const result = await authService.verifyEmail({
    email: req.body.email,
    otp: req.body.otp,
  });

  res.json(result);
}

async function verifyResetOtp(req, res) {
  const result = await authService.verifyResetOtp({
    email: req.body.email,
    otp: req.body.otp,
  });

  res.json(result);
}

async function resetPassword(req, res) {
  const result = await authService.resetPassword({
    email: req.body.email,
    newPassword: req.body.newPassword,
  });

  res.json(result);
}

module.exports = {
  forgotPassword,
  signup,
  login,
  resetPassword,
  verifyEmail,
  verifyResetOtp,
};
