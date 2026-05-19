const { z } = require("zod");

function valueToString(value) {
  if (value === undefined || value === null) {
    return "";
  }

  return String(value);
}

function requiredText(fieldName) {
  return z.preprocess(
    valueToString,
    z.string().trim().min(1, `${fieldName} is required.`)
  );
}

function requiredEmail() {
  return z.preprocess(
    valueToString,
    z
      .string()
      .trim()
      .min(1, "email is required.")
      .email("email must be valid.")
  );
}

function requiredPassword() {
  return z.preprocess(
    valueToString,
    z
      .string()
      .trim()
      .min(6, "password must be at least 6 characters.")
  );
}

function requiredLimitedText(fieldName, maxLength) {
  return z.preprocess(
    valueToString,
    z
      .string()
      .trim()
      .min(1, `${fieldName} is required.`)
      .max(maxLength, `${fieldName} must be at most ${maxLength} characters.`)
  );
}

function optionalText() {
  return z.preprocess(
    (value) => {
      if (value === undefined || value === null || String(value).trim() === "") {
        return undefined;
      }

      return String(value);
    },
    z.string().trim().optional()
  );
}

const pageId = z.preprocess(
  (value) => {
    if (value === undefined || value === null) {
      return "";
    }

    return String(value).trim();
  },
  z
    .string()
    .min(1, "pageId is required.")
    .regex(/^[1-9]\d*$/, "pageId must be a positive number.")
    .transform(Number)
);

const optionalPageId = z.preprocess(
  (value) => {
    if (value === undefined || value === null || String(value).trim() === "") {
      return undefined;
    }

    return String(value).trim();
  },
  z
    .string()
    .regex(/^[1-9]\d*$/, "pageId must be a positive number.")
    .transform(Number)
    .optional()
);

module.exports = {
  requiredEmail,
  requiredLimitedText,
  requiredPassword,
  optionalText,
  optionalPageId,
  pageId,
  requiredText,
};
