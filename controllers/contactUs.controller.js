const sectionService = require("../services/section.service");
const { deleteById } = require("../utils/http");
const { optionalImageURL, optionalText, pageId, text } = require("../utils/request");

async function getContactUsPage(req, res) {
  const page = await sectionService.getContactUsPage();
  res.json(page);
}

async function upsertContactUs(req, res) {
  const item = await sectionService.upsertContactUs({
    title: text(req, "title"),
    description: optionalText(req, "description"),
    phone: optionalText(req, "phone"),
    address: optionalText(req, "address"),
    email: optionalText(req, "email"),
    imageURL: optionalImageURL(req),
    pageId: pageId(req),
  });

  res.status(201).json(item);
}

function deleteContactUs(req, res) {
  return deleteById(req, res, sectionService.deleteContactUs, "contact us section");
}

module.exports = {
  deleteContactUs,
  getContactUsPage,
  upsertContactUs,
};
