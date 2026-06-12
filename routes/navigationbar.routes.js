const router = require("express").Router();

const navigationbarController = require("../controllers/navigationbar.controller");
const validate = require("../middlewares/validate.middleware");
const asyncRoute = require("../utils/asyncRoute");
const { upload } = require("../utils/upload");
const {
  upsertNavigationbarSchema,
} = require("../validations/section.validation");

router.get("/", asyncRoute(navigationbarController.getNavigationbar));
router.post(
  "/",
  upload.single("image"),
  validate(upsertNavigationbarSchema),
  asyncRoute(navigationbarController.upsertNavigationbar)
);

router.delete("/:id", asyncRoute(navigationbarController.deleteNavigationbar));

module.exports = router;
