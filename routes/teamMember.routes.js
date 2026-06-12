const router = require("express").Router();
const teamMemberController = require("../controllers/teamMember.controller");
const validate = require("../middlewares/validate.middleware");
const asyncRoute = require("../utils/asyncRoute");
const { upload } = require("../utils/upload");
const {
  titleDescriptionPageImageSchema,
} = require("../validations/section.validation");

router.get("/", asyncRoute(teamMemberController.listTeamMembers));

router.post(
  "/",
  upload.single("image"),
  validate(titleDescriptionPageImageSchema),
  asyncRoute(teamMemberController.upsertTeamMember)
);

router.delete("/:id", asyncRoute(teamMemberController.deleteTeamMember));

module.exports = router;
