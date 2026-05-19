const router = require("express").Router();

const mainBannerController = require("../controllers/mainBanner.controller");
const asyncRoute = require("../utils/asyncRoute");
const { upload } = require("../utils/upload");

router.post("/", upload.single("image"), asyncRoute(mainBannerController.upsertMainBanner));

module.exports = router;
