const router = require("express").Router();

const groupHistoryController = require("../controllers/groupHistory.controller");
const asyncRoute = require("../utils/asyncRoute");
const { upload } = require("../utils/upload");

router.post("/", upload.single("image"), asyncRoute(groupHistoryController.upsertGroupHistory));

module.exports = router;
