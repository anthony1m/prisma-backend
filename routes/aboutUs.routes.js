const router = require("express").Router();

const aboutUsController = require("../controllers/aboutUs.controller");
const asyncRoute = require("../utils/asyncRoute");

router.get("/", asyncRoute(aboutUsController.getAboutUsPage));

module.exports = router;
