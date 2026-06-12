const sectionService = require("../services/section.service");
const { deleteById } = require("../utils/http");
const { imageURL, pageId, text } = require("../utils/request");

async function upsertStrategicPresence(req, res) {
  const item = await sectionService.upsertStrategicPresence({
    title: text(req, "title"),
    description: text(req, "description"),
    imageURL: imageURL(req),
    pageId: pageId(req),
  });

  res.status(201).json(item);
}

function deleteStrategicPresence(req, res) {
  return deleteById(
    req,
    res,
    sectionService.deleteStrategicPresence,
    "strategic presence"
  );
}

module.exports = {
  deleteStrategicPresence,
  upsertStrategicPresence,
};
