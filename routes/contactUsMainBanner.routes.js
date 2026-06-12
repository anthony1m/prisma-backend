const router = require("express").Router();

const contactUsMainBannerController = require("../controllers/contactUsMainBanner.controller");
const validate = require("../middlewares/validate.middleware");
const asyncRoute = require("../utils/asyncRoute");
const { upload } = require("../utils/upload");
const {
  upsertContactUsMainBannerSchema,
} = require("../validations/section.validation");

router.get("/", asyncRoute(contactUsMainBannerController.getContactUsMainBanner));
router.post(
  "/",
  upload.single("image"),
  validate(upsertContactUsMainBannerSchema),
  asyncRoute(contactUsMainBannerController.upsertContactUsMainBanner)
);

router.delete(
  "/:id",
  asyncRoute(contactUsMainBannerController.deleteContactUsMainBanner)
);

module.exports = router;
