const sectionService = require("../services/section.service");
const { imageURL, optionalText, text } = require("../utils/request");

async function getContactUsMainBanner(req, res) {
  const item = await sectionService.getContactUsMainBanner();
  res.json(item);
}

async function upsertContactUsMainBanner(req, res) {
  const item = await sectionService.upsertContactUsMainBanner({
    title: text(req, "title"),
    description: optionalText(req, "description"),
    imageURL: imageURL(req),
  });

  res.status(201).json(item);
}

module.exports = {
  getContactUsMainBanner,
  upsertContactUsMainBanner,
};
