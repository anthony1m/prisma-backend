const ourPartnerService = require("../services/ourPartner.service");
const {
  imageURL,
  imageURLs,
  optionalPageId,
  optionalText,
  text,
} = require("../utils/request");

function createError(message, statusCode) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function firstValue(value) {
  return Array.isArray(value) ? value[0] : value;
}

function optionalString(value) {
  const resolvedValue = firstValue(value);

  if (!resolvedValue || !String(resolvedValue).trim()) {
    return undefined;
  }

  return String(resolvedValue).trim();
}

function optionalId(value, fieldName = "id") {
  const resolvedValue = firstValue(value);

  if (resolvedValue === undefined || resolvedValue === null || resolvedValue === "") {
    return undefined;
  }

  const id = Number(resolvedValue);

  if (!Number.isInteger(id) || id < 1) {
    throw createError(`${fieldName} must be a positive number.`, 400);
  }

  return id;
}

function requiredId(value, fieldName = "id") {
  const id = optionalId(value, fieldName);

  if (id === undefined) {
    throw createError(`${fieldName} is required.`, 400);
  }

  return id;
}

function requireFound(item, message) {
  if (!item) {
    throw createError(message, 404);
  }

  return item;
}

async function getOurPartnerPage(req, res) {
  const id = optionalId(req.query.id);
  const section = optionalString(req.query.section);

  if (id !== undefined || section) {
    const result = await ourPartnerService.searchOurPartner({
      id,
      section,
    });
    res.json(result);
    return;
  }

  const page = await ourPartnerService.getOurPartnerPage();
  res.json(page);
}

async function searchOurPartner(req, res) {
  const id = optionalId(req.query.id);
  const section = optionalString(req.query.section);
  const result = await ourPartnerService.searchOurPartner({
    id,
    section,
  });

  res.json(result);
}

async function searchOurPartnerById(req, res) {
  const id = requiredId(req.params.id);
  const result = await ourPartnerService.searchOurPartner({
    id,
  });

  res.json(result);
}

async function getOurPartnerSection(req, res) {
  const section = optionalString(req.params.section);
  const id = optionalId(req.params.id ?? req.query.id);
  const result = await ourPartnerService.getOurPartnerSection(section, id);

  res.json(result);
}

async function getOurPartnerMainBanner(req, res) {
  const id = optionalId(req.query.id);
  const item = await ourPartnerService.getOurPartnerMainBanner(id);

  res.json(requireFound(item, "Our Partner main banner was not found."));
}

async function getOurPartnerMainBannerById(req, res) {
  const id = requiredId(req.params.id);
  const item = await ourPartnerService.getOurPartnerMainBanner(id);

  res.json(requireFound(item, "Our Partner main banner was not found."));
}

async function getOurPartnerBankPartners(req, res) {
  const id = optionalId(req.query.id);
  const item = await ourPartnerService.getOurPartnerBankPartners(id);

  res.json(requireFound(item, "Our Partner bank partners section was not found."));
}

async function getOurPartnerBankPartnersById(req, res) {
  const id = requiredId(req.params.id);
  const item = await ourPartnerService.getOurPartnerBankPartners(id);

  res.json(requireFound(item, "Our Partner bank partners section was not found."));
}

async function getOurPartnerOtherPartners(req, res) {
  const id = optionalId(req.query.id);
  const item = await ourPartnerService.getOurPartnerOtherPartners(id);

  res.json(requireFound(item, "Our Partner other partners section was not found."));
}

async function getOurPartnerOtherPartnersById(req, res) {
  const id = requiredId(req.params.id);
  const item = await ourPartnerService.getOurPartnerOtherPartners(id);

  res.json(requireFound(item, "Our Partner other partners section was not found."));
}

async function upsertOurPartnerMainBanner(req, res) {
  const item = await ourPartnerService.upsertOurPartnerMainBanner({
    title: text(req, "title"),
    description: optionalText(req, "description"),
    imageURL: imageURL(req),
    pageId: optionalPageId(req),
  });

  res.status(201).json(item);
}

async function upsertOurPartnerBankPartners(req, res) {
  const item = await ourPartnerService.upsertOurPartnerBankPartners({
    imageURLs: imageURLs(req),
    pageId: optionalPageId(req),
  });

  res.status(201).json(item);
}

async function upsertOurPartnerOtherPartners(req, res) {
  const item = await ourPartnerService.upsertOurPartnerOtherPartners({
    imageURLs: imageURLs(req),
    pageId: optionalPageId(req),
  });

  res.status(201).json(item);
}

module.exports = {
  getOurPartnerPage,
  getOurPartnerBankPartners,
  getOurPartnerBankPartnersById,
  getOurPartnerMainBanner,
  getOurPartnerMainBannerById,
  getOurPartnerOtherPartners,
  getOurPartnerOtherPartnersById,
  getOurPartnerSection,
  searchOurPartner,
  searchOurPartnerById,
  upsertOurPartnerBankPartners,
  upsertOurPartnerMainBanner,
  upsertOurPartnerOtherPartners,
};
