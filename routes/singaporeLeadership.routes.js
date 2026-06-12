const router = require("express").Router();

const singaporeLeadershipController = require("../controllers/singaporeLeadership.controller");
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
  asyncRoute(singaporeLeadershipController.upsertSingaporeLeadership)
);

router.delete(
  "/:id",
  asyncRoute(singaporeLeadershipController.deleteSingaporeLeadership)
);

module.exports = router;
