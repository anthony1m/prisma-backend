const router = require("express").Router();

const missionController = require("../controllers/mission.controller");
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
  asyncRoute(missionController.upsertMission)
);

router.delete("/:id", asyncRoute(missionController.deleteMission));

module.exports = router;
