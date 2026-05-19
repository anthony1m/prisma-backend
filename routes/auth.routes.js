const router = require("express").Router();

const authController = require("../controllers/auth.controller");
const validate = require("../middlewares/validate.middleware");
const asyncRoute = require("../utils/asyncRoute");
const {
  loginSchema,
  signupSchema,
} = require("../validations/auth.validation");

router.post("/signup", validate(signupSchema), asyncRoute(authController.signup));
router.post("/login", validate(loginSchema), asyncRoute(authController.login));

module.exports = router;
