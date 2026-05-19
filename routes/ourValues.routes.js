const router = require("express").Router();

const ourValuesController = require("../controllers/ourValues.controller");
const validate = require("../middlewares/validate.middleware");
const asyncRoute = require("../utils/asyncRoute");
const { upload } = require("../utils/upload");
const { upsertOurValueSchema } = require("../validations/section.validation");

router.post(
  "/",
  upload.none(),
  validate(upsertOurValueSchema),
  asyncRoute(ourValuesController.upsertOurValue)
);

module.exports = router;
