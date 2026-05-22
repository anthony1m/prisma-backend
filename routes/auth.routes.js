const router = require("express").Router();

const authController = require("../controllers/auth.controller");
const validate = require("../middlewares/validate.middleware");
const asyncRoute = require("../utils/asyncRoute");
const {
  forgotPasswordSchema,
  loginSchema,
  resetPasswordSchema,
  signupSchema,
  verifyEmailSchema,
  verifyResetOtpSchema,
} = require("../validations/auth.validation");

router.post("/signup", validate(signupSchema), asyncRoute(authController.signup));
router.post("/login", validate(loginSchema), asyncRoute(authController.login));
router.post(
  "/verify-email",
  validate(verifyEmailSchema),
  asyncRoute(authController.verifyEmail)
);
router.post(
  "/forgot-password",
  validate(forgotPasswordSchema),
  asyncRoute(authController.forgotPassword)
);
router.post(
  "/verify-reset-otp",
  validate(verifyResetOtpSchema),
  asyncRoute(authController.verifyResetOtp)
);
router.post(
  "/reset-password",
  validate(resetPasswordSchema),
  asyncRoute(authController.resetPassword)
);

module.exports = router;
