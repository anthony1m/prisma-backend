const router = require("express").Router();

const teamMemberController = require("../controllers/teamMember.controller");
const asyncRoute = require("../utils/asyncRoute");
const { upload } = require("../utils/upload");

router.post("/", upload.single("image"), asyncRoute(teamMemberController.upsertTeamMember));

module.exports = router;
