const sectionService = require("../services/section.service");
const { deleteById } = require("../utils/http");
const { imageURL, pageId, text } = require("../utils/request");

async function upsertMainBanner(req, res) {
  const item = await sectionService.upsertMainBanner({
    title: text(req, "title"),
    description: text(req, "description"),
    imageURL: imageURL(req),
    pageId: pageId(req),
  });

  res.status(201).json(item);
}

function deleteMainBanner(req, res) {
  return deleteById(req, res, sectionService.deleteMainBanner, "main banner");
}

module.exports = {
  deleteMainBanner,
  upsertMainBanner,
};
