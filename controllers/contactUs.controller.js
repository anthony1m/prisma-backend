const sectionService = require("../services/section.service");
const { optionalImageURL, optionalText, pageId, text } = require("../utils/request");

async function getContactUsPage(req, res) {
  const page = await sectionService.getContactUsPage();
  res.json(page);
}

async function upsertContactUs(req, res) {
  const item = await sectionService.upsertContactUs({
    title: text(req, "title"),
    description: optionalText(req, "description"),
    imageURL: optionalImageURL(req),
    pageId: pageId(req),
  });

  res.status(201).json(item);
}

module.exports = {
  getContactUsPage,
  upsertContactUs,
};
