const ourPartnerService = require("../services/ourPartner.service");
const {
  imageURL,
  imageURLs,
  optionalPageId,
  optionalText,
  text,
} = require("../utils/request");

async function getOurPartnerPage(req, res) {
  const page = await ourPartnerService.getOurPartnerPage();
  res.json(page);
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
  upsertOurPartnerBankPartners,
  upsertOurPartnerMainBanner,
  upsertOurPartnerOtherPartners,
};
