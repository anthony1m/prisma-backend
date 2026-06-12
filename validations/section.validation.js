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
  phone: optionalText(),
  address: optionalText(),
  email: optionalText(),
  pageId,
  imageURL,
});

const upsertContactUsLocationSchema = z.object({
  description: optionalText(),
  phone: optionalText(),
  address: optionalText(),
  email: optionalText(),
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

const optionalId = z.preprocess(
  (value) => {
    if (value === undefined || value === null || String(value).trim() === "") {
      return undefined;
    }

    return String(value).trim();
  },
  z
    .string()
    .regex(/^[1-9]\d*$/, "id must be a positive number.")
    .transform(Number)
    .optional()
);

const upsertStrategicObjectiveSchema = z.object({
  id: optionalId,
  description: requiredText("description"),
  pageId,
  imageURL,
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
  upsertStrategicObjectiveSchema,
  upsertWhoWeAreSchema,
};
