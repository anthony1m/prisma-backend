const router = require("express").Router();

const groupHistoryController = require("../controllers/groupHistory.controller");
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
  asyncRoute(groupHistoryController.upsertGroupHistory)
);

router.delete("/:id", asyncRoute(groupHistoryController.deleteGroupHistory));

module.exports = router;
