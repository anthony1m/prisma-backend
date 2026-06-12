const router = require("express").Router();

const strategicObjectivesController = require("../controllers/strategicObjectives.controller");
const validate = require("../middlewares/validate.middleware");
const asyncRoute = require("../utils/asyncRoute");
const { upload } = require("../utils/upload");
const {
  upsertStrategicObjectiveSchema,
} = require("../validations/section.validation");

router.get("/", asyncRoute(strategicObjectivesController.listStrategicObjectives));

router.post(
  "/",
  upload.single("image"),
  validate(upsertStrategicObjectiveSchema),
  asyncRoute(strategicObjectivesController.upsertStrategicObjective)
);

router.delete(
  "/:id",
  asyncRoute(strategicObjectivesController.deleteStrategicObjective)
);

module.exports = router;
