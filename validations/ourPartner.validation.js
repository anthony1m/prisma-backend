const { z } = require("zod");
const {
  optionalPageId,
  optionalText,
  requiredText,
} = require("./common.validation");

const imageURL = optionalText();

const upsertOurPartnerMainBannerSchema = z.object({
  title: requiredText("title"),
  description: optionalText(),
  imageURL,
  pageId: optionalPageId,
});

const upsertOurPartnerSectionSchema = z.object({
  imageURL,
  pageId: optionalPageId,
});

module.exports = {
  upsertOurPartnerMainBannerSchema,
  upsertOurPartnerSectionSchema,
};
