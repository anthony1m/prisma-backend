const router = require("express").Router();

const singaporeLeadershipController = require("../controllers/singaporeLeadership.controller");
const asyncRoute = require("../utils/asyncRoute");
const { upload } = require("../utils/upload");

router.post("/", upload.single("image"), asyncRoute(singaporeLeadershipController.upsertSingaporeLeadership));

module.exports = router;
