const router = require("express").Router();

const authController = require("../controllers/auth.controller");
const asyncRoute = require("../utils/asyncRoute");

router.post("/signup", asyncRoute(authController.signup));
router.post("/login", asyncRoute(authController.login));

module.exports = router;