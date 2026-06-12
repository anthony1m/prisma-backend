const sectionService = require("../services/section.service");
const { deleteById } = require("../utils/http");
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

function deleteContactUsMainBanner(req, res) {
  return deleteById(
    req,
    res,
    sectionService.deleteContactUsMainBanner,
    "contact us main banner"
  );
}

module.exports = {
  deleteContactUsMainBanner,
  getContactUsMainBanner,
  upsertContactUsMainBanner,
};
