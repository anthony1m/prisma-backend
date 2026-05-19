const router = require("express").Router();

const strategicObjectivesController = require("../controllers/strategicObjectives.controller");
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
  asyncRoute(strategicObjectivesController.upsertStrategicObjective)
);

module.exports = router;
