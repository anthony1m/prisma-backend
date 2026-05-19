const router = require("express").Router();

const navigationbarController = require("../controllers/navigationbar.controller");
const asyncRoute = require("../utils/asyncRoute");
const { upload } = require("../utils/upload");

router.get("/", asyncRoute(navigationbarController.getNavigationbar));
router.post("/", upload.single("image"), asyncRoute(navigationbarController.upsertNavigationbar));

module.exports = router;
