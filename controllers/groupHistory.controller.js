const sectionService = require("../services/section.service");
const { deleteById } = require("../utils/http");
const { imageURL, pageId, text } = require("../utils/request");

async function upsertGroupHistory(req, res) {
  const item = await sectionService.upsertGroupHistory({
    title: text(req, "title"),
    description: text(req, "description"),
    imageURL: imageURL(req),
    pageId: pageId(req),
  });

  res.status(201).json(item);
}

function deleteGroupHistory(req, res) {
  return deleteById(req, res, sectionService.deleteGroupHistory, "group history");
}

module.exports = {
  deleteGroupHistory,
  upsertGroupHistory,
};
