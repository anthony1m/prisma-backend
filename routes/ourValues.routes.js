const router = require("express").Router();

const ourValuesController = require("../controllers/ourValues.controller");
const asyncRoute = require("../utils/asyncRoute");
const { upload } = require("../utils/upload");

router.post("/", upload.none(), asyncRoute(ourValuesController.upsertOurValue));

module.exports = router;
