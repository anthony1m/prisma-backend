const router = require("express").Router();

const theExpansionController = require("../controllers/theExpansion.controller");
const validate = require("../middlewares/validate.middleware");
const asyncRoute = require("../utils/asyncRoute");
const { upload } = require("../utils/upload");
const {
  titleDescriptionPageImageSchema,
} = require("../validations/section.validation");

router.get("/", asyncRoute(theExpansionController.listTheExpansions));
router.post(
  "/",
  upload.single("image"),
  validate(titleDescriptionPageImageSchema),
  asyncRoute(theExpansionController.upsertTheExpansion)
);
router.delete(
  "/:id",
  asyncRoute(theExpansionController.deleteTheExpansion)
);
module.exports = router;
