const router = require("express").Router();

const ourPartnerController = require("../controllers/ourPartner.controller");
const asyncRoute = require("../utils/asyncRoute");

router.get("/search", asyncRoute(ourPartnerController.searchOurPartner));
router.get(
  "/section/:section/:id",
  asyncRoute(ourPartnerController.getOurPartnerSection)
);
router.delete(
  "/section/:section/:id",
  asyncRoute(ourPartnerController.deleteOurPartnerSection)
);
router.get(
  "/section/:section",
  asyncRoute(ourPartnerController.getOurPartnerSection)
);
router.get("/:id", asyncRoute(ourPartnerController.searchOurPartnerById));
router.get("/", asyncRoute(ourPartnerController.getOurPartnerPage));

module.exports = router;
