const router = require("express").Router();

const contactUsLocationController = require("../controllers/contactUsLocation.controller");
const asyncRoute = require("../utils/asyncRoute");
const { upload } = require("../utils/upload");

router.get("/", asyncRoute(contactUsLocationController.getContactUsSenegal));
router.post("/", upload.single("image"), asyncRoute(contactUsLocationController.upsertContactUsSenegal));

module.exports = router;
