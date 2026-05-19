const router = require("express").Router();

const homeFooterController = require("../controllers/homeFooter.controller");
const validate = require("../middlewares/validate.middleware");
const asyncRoute = require("../utils/asyncRoute");
const { upload } = require("../utils/upload");
const { upsertHomeFooterSchema } = require("../validations/section.validation");

router.get("/", asyncRoute(homeFooterController.getHomeFooter));
router.post(
  "/",
  upload.single("image"),
  validate(upsertHomeFooterSchema),
  asyncRoute(homeFooterController.upsertHomeFooter)
);

module.exports = router;
