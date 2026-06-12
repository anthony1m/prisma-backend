const router = require("express").Router();

const aboutUsBannerController = require("../controllers/aboutusbanner.controller");
const validate = require("../middlewares/validate.middleware");
const asyncRoute = require("../utils/asyncRoute");
const { upload } = require("../utils/upload");
const {
  upsertAboutUsBannerSchema,
} = require("../validations/section.validation");

router.get("/", asyncRoute(aboutUsBannerController.getAboutUsBanner));

router.post(
  "/",
  upload.single("image"),
  validate(upsertAboutUsBannerSchema),
  asyncRoute(aboutUsBannerController.upsertAboutUsBanner)
);

router.delete("/:id", asyncRoute(aboutUsBannerController.deleteAboutUsBanner));

module.exports = router;
