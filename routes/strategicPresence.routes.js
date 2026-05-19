const router = require("express").Router();

const strategicPresenceController = require("../controllers/strategicPresence.controller");
const validate = require("../middlewares/validate.middleware");
const asyncRoute = require("../utils/asyncRoute");
const { upload } = require("../utils/upload");
const {
  titleDescriptionPageImageSchema,
} = require("../validations/section.validation");

router.post(
  "/",
  upload.single("image"),
  validate(titleDescriptionPageImageSchema),
  asyncRoute(strategicPresenceController.upsertStrategicPresence)
);

module.exports = router;
