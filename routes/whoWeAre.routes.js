const router = require("express").Router();

const whoWeAreController = require("../controllers/whoWeAre.controller");
const validate = require("../middlewares/validate.middleware");
const asyncRoute = require("../utils/asyncRoute");
const { upload } = require("../utils/upload");
const { upsertWhoWeAreSchema } = require("../validations/section.validation");

router.post(
  "/",
  upload.single("image"),
  validate(upsertWhoWeAreSchema),
  asyncRoute(whoWeAreController.upsertWhoWeAre)
);

module.exports = router;
