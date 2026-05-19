const router = require("express").Router();

const groupMissionController = require("../controllers/groupMission.controller");
const asyncRoute = require("../utils/asyncRoute");
const { upload } = require("../utils/upload");

router.post("/", upload.single("image"), asyncRoute(groupMissionController.upsertGroupMission));

module.exports = router;
