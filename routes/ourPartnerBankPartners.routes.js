const router = require("express").Router();

const ourPartnerController = require("../controllers/ourPartner.controller");
const validate = require("../middlewares/validate.middleware");
const asyncRoute = require("../utils/asyncRoute");
const { upload } = require("../utils/upload");
const {
  upsertOurPartnerSectionSchema,
} = require("../validations/ourPartner.validation");

router.get("/", asyncRoute(ourPartnerController.getOurPartnerBankPartners));
router.get("/:id", asyncRoute(ourPartnerController.getOurPartnerBankPartnersById));

router.post(
  "/",
  upload.single("image"),
  validate(upsertOurPartnerSectionSchema),
  asyncRoute(ourPartnerController.upsertOurPartnerBankPartners)
);

module.exports = router;
