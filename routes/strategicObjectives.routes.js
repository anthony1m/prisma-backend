const router = require("express").Router();

const strategicObjectivesController = require("../controllers/strategicObjectives.controller");
const asyncRoute = require("../utils/asyncRoute");
const { upload } = require("../utils/upload");

router.post("/", upload.single("image"), asyncRoute(strategicObjectivesController.upsertStrategicObjective));

module.exports = router;
