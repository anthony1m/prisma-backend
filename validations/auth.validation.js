const { z } = require("zod");
const {
  requiredEmail,
  requiredLimitedText,
  requiredPassword,
  requiredText,
} = require("./common.validation");

const signupSchema = z.object({
  name: requiredLimitedText("name", 100),
  email: requiredEmail(),
  password: requiredPassword(),
});

const loginSchema = z.object({
  email: requiredEmail(),
  password: requiredText("password"),
});

module.exports = {
  loginSchema,
  signupSchema,
};
