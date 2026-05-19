const router = require("express").Router();

const whoWeAreController = require("../controllers/whoWeAre.controller");
const asyncRoute = require("../utils/asyncRoute");
const { upload } = require("../utils/upload");

router.post("/", upload.single("image"), asyncRoute(whoWeAreController.upsertWhoWeAre));

module.exports = router;
