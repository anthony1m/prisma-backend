const router = require("express").Router();

const serviceController = require("../controllers/service.controller");
const asyncRoute = require("../utils/asyncRoute");
const { upload } = require("../utils/upload");

router.post("/", upload.single("image"), asyncRoute(serviceController.upsertOurService));

module.exports = router;
