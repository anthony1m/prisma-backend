const router = require("express").Router();

const missionController = require("../controllers/mission.controller");
const asyncRoute = require("../utils/asyncRoute");
const { upload } = require("../utils/upload");

router.post("/", upload.single("image"), asyncRoute(missionController.upsertMission));

module.exports = router;
