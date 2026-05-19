const router = require("express").Router();

const homeController = require("../controllers/home.controller");
const asyncRoute = require("../utils/asyncRoute");

router.get("/", asyncRoute(homeController.getHomePage));

module.exports = router;