const router = require("express").Router();

const contactUsMainBannerController = require("../controllers/contactUsMainBanner.controller");
const asyncRoute = require("../utils/asyncRoute");
const { upload } = require("../utils/upload");

router.get("/", asyncRoute(contactUsMainBannerController.getContactUsMainBanner));
router.post("/", upload.single("image"), asyncRoute(contactUsMainBannerController.upsertContactUsMainBanner));

module.exports = router;
