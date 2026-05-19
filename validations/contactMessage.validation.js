const { z } = require("zod");
const {
  optionalText,
  requiredEmail,
  requiredLimitedText,
} = require("./common.validation");

const sendContactMessageSchema = z.object({
  name: requiredLimitedText("name", 100),
  email: requiredEmail(),
  phone: optionalText(),
  subject: optionalText(),
  message: requiredLimitedText("message", 2000),
});

module.exports = {
  sendContactMessageSchema,
};
