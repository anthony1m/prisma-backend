const router = require("express").Router();

const pageController = require("../controllers/page.controller");
const validate = require("../middlewares/validate.middleware");
const asyncRoute = require("../utils/asyncRoute");
const { upsertPageSchema } = require("../validations/page.validation");

router.get("/", asyncRoute(pageController.listPages));
router.post("/", validate(upsertPageSchema), asyncRoute(pageController.upsertPage));

module.exports = router;
