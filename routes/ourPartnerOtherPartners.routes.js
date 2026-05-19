const router = require("express").Router();

const ourPartnerController = require("../controllers/ourPartner.controller");
const validate = require("../middlewares/validate.middleware");
const asyncRoute = require("../utils/asyncRoute");
const { upload } = require("../utils/upload");
const {
  upsertOurPartnerSectionSchema,
} = require("../validations/ourPartner.validation");

router.post(
  "/",
  upload.single("image"),
  validate(upsertOurPartnerSectionSchema),
  asyncRoute(ourPartnerController.upsertOurPartnerOtherPartners)
);

module.exports = router;
