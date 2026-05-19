const router = require("express").Router();

const contactUsLocationController = require("../controllers/contactUsLocation.controller");
const validate = require("../middlewares/validate.middleware");
const asyncRoute = require("../utils/asyncRoute");
const { upload } = require("../utils/upload");
const {
  upsertContactUsLocationSchema,
} = require("../validations/section.validation");

router.get("/", asyncRoute(contactUsLocationController.getContactUsSenegal));
router.post(
  "/",
  upload.single("image"),
  validate(upsertContactUsLocationSchema),
  asyncRoute(contactUsLocationController.upsertContactUsSenegal)
);

module.exports = router;
