const sectionService = require("../services/section.service");
const { deleteById } = require("../utils/http");
const { imageURL, pageId, text } = require("../utils/request");

async function upsertAboutUsBanner(req, res) {
  const item = await sectionService.upsertAboutUsBanner({
    title: text(req, "title"),
    imageURL: imageURL(req),
    pageId: pageId(req),
  });

  res.status(201).json(item);
}

async function getAboutUsBanner(req, res) {
  const item = await sectionService.getAboutUsBanner();

  res.json(item);
}

function deleteAboutUsBanner(req, res) {
  return deleteById(req, res, sectionService.deleteAboutUsBanner, "about us banner");
}

module.exports = {
  deleteAboutUsBanner,
  getAboutUsBanner,
  upsertAboutUsBanner,
};
