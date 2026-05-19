const router = require("express").Router();

const pageController = require("../controllers/page.controller");
const asyncRoute = require("../utils/asyncRoute");

router.get("/", asyncRoute(pageController.listPages));
router.post("/", asyncRoute(pageController.upsertPage));

module.exports = router;
