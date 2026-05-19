const router = require("express").Router();

const aboutUsBannerController = require("../controllers/aboutusbanner.controller");
const asyncRoute = require("../utils/asyncRoute");
const { upload } = require("../utils/upload");

router.get("/", asyncRoute(aboutUsBannerController.getAboutUsBanner));

router.post(
  "/",
  upload.single("image"),
  asyncRoute(aboutUsBannerController.upsertAboutUsBanner)
);

module.exports = router;
