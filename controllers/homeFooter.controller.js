const sectionService = require("../services/section.service");
const { imageURL, text } = require("../utils/request");

async function getHomeFooter(req, res) {
  const item = await sectionService.getHomeFooter();
  res.json(item);
}

async function upsertHomeFooter(req, res) {
  const item = await sectionService.upsertHomeFooter({
    title: text(req, "title"),
    description: text(req, "description"),
    imageURL: imageURL(req),
  });

  res.status(201).json(item);
}

module.exports = {
  getHomeFooter,
  upsertHomeFooter,
};
