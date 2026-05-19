const router = require("express").Router();

const strategicPresenceController = require("../controllers/strategicPresence.controller");
const asyncRoute = require("../utils/asyncRoute");
const { upload } = require("../utils/upload");

router.post("/", upload.single("image"), asyncRoute(strategicPresenceController.upsertStrategicPresence));

module.exports = router;
