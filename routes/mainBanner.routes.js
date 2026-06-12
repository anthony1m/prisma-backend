const router = require("express").Router();

const mainBannerController = require("../controllers/mainBanner.controller");
const validate = require("../middlewares/validate.middleware");
const asyncRoute = require("../utils/asyncRoute");
const { upload } = require("../utils/upload");
const { upsertMainBannerSchema } = require("../validations/section.validation");

router.post(
  "/",
  upload.single("image"),
  validate(upsertMainBannerSchema),
  asyncRoute(mainBannerController.upsertMainBanner)
);

router.delete("/:id", asyncRoute(mainBannerController.deleteMainBanner));

module.exports = router;
