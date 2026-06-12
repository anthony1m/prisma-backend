const sectionService = require("../services/section.service");
const { deleteById } = require("../utils/http");
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

function deleteHomeFooter(req, res) {
  return deleteById(req, res, sectionService.deleteHomeFooter, "home footer");
}

module.exports = {
  deleteHomeFooter,
  getHomeFooter,
  upsertHomeFooter,
};
