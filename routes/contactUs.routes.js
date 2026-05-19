const router = require("express").Router();

const contactUsController = require("../controllers/contactUs.controller");
const asyncRoute = require("../utils/asyncRoute");
const { upload } = require("../utils/upload");

router.get("/", asyncRoute(contactUsController.getContactUsPage));
router.post("/", upload.single("image"), asyncRoute(contactUsController.upsertContactUs));

module.exports = router;
