const { z } = require("zod");
const {
  optionalText,
  pageId,
  requiredText,
} = require("./common.validation");

const imageURL = optionalText();

const titleDescriptionPageImageSchema = z.object({
  title: requiredText("title"),
  description: requiredText("description"),
  pageId,
  imageURL,
});

const titleDescriptionImageSchema = z.object({
  title: requiredText("title"),
  description: requiredText("description"),
  imageURL,
});

const upsertAboutUsBannerSchema = z.object({
  title: requiredText("title"),
  pageId,
  imageURL,
});

const upsertContactUsMainBannerSchema = z.object({
  title: requiredText("title"),
  description: optionalText(),
  imageURL,
});

const upsertContactUsSchema = z.object({
  title: requiredText("title"),
  description: optionalText(),
  pageId,
  imageURL,
});

const upsertContactUsLocationSchema = z.object({
  description: requiredText("description"),
  imageURL,
});

const upsertHomeFooterSchema = titleDescriptionImageSchema;

const upsertMainBannerSchema = titleDescriptionPageImageSchema;

const upsertNavigationbarSchema = z.object({
  button: requiredText("button"),
  imageURL,
});

const upsertOurValueSchema = z.object({
  title: requiredText("title"),
  description: optionalText(),
  pageId,
});

const upsertWhoWeAreSchema = z.object({
  title: requiredText("title"),
  description: requiredText("description"),
  button: requiredText("button"),
  pageId,
  imageURL,
});

module.exports = {
  titleDescriptionPageImageSchema,
  upsertAboutUsBannerSchema,
  upsertContactUsLocationSchema,
  upsertContactUsMainBannerSchema,
  upsertContactUsSchema,
  upsertHomeFooterSchema,
  upsertMainBannerSchema,
  upsertNavigationbarSchema,
  upsertOurValueSchema,
  upsertWhoWeAreSchema,
};
