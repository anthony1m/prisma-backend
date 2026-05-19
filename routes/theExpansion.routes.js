const router = require("express").Router();

const theExpansionController = require("../controllers/theExpansion.controller");
const asyncRoute = require("../utils/asyncRoute");
const { upload } = require("../utils/upload");

router.get("/", asyncRoute(theExpansionController.listTheExpansions));
router.post("/", upload.single("image"), asyncRoute(theExpansionController.upsertTheExpansion));

module.exports = router;
