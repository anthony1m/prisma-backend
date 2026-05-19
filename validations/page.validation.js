const { z } = require("zod");
const { requiredLimitedText } = require("./common.validation");

const upsertPageSchema = z.object({
  title: requiredLimitedText("title", 150),
});

module.exports = {
  upsertPageSchema,
};
