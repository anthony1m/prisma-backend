const router = require("express").Router();

const contactMessageController = require("../controllers/contactMessage.controller");
const validate = require("../middlewares/validate.middleware");
const asyncRoute = require("../utils/asyncRoute");
const {
  sendContactMessageSchema,
} = require("../validations/contactMessage.validation");

router.post(
  "/",
  validate(sendContactMessageSchema),
  asyncRoute(contactMessageController.sendContactMessage)
);

module.exports = router;
