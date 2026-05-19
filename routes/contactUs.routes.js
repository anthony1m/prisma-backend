const router = require("express").Router();

const contactUsController = require("../controllers/contactUs.controller");
const validate = require("../middlewares/validate.middleware");
const asyncRoute = require("../utils/asyncRoute");
const { upload } = require("../utils/upload");
const { upsertContactUsSchema } = require("../validations/section.validation");

router.get("/", asyncRoute(contactUsController.getContactUsPage));
router.post(
  "/",
  upload.single("image"),
  validate(upsertContactUsSchema),
  asyncRoute(contactUsController.upsertContactUs)
);

module.exports = router;
