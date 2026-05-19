const sectionService = require("../services/section.service");
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

module.exports = {
  upsertAboutUsBanner,
  getAboutUsBanner,
};
