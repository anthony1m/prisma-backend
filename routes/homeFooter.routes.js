const router = require("express").Router();

const homeFooterController = require("../controllers/homeFooter.controller");
const asyncRoute = require("../utils/asyncRoute");
const { upload } = require("../utils/upload");

router.get("/", asyncRoute(homeFooterController.getHomeFooter));
router.post("/", upload.single("image"), asyncRoute(homeFooterController.upsertHomeFooter));

module.exports = router;
