const sectionService = require("../services/section.service");
const { deleteById } = require("../utils/http");
const { imageURL, pageId, text } = require("../utils/request");

async function upsertMission(req, res) {
  const item = await sectionService.upsertMission({
    title: text(req, "title"),
    description: text(req, "description"),
    imageURL: imageURL(req),
    pageId: pageId(req),
  });

  res.status(201).json(item);
}

function deleteMission(req, res) {
  return deleteById(req, res, sectionService.deleteMission, "mission");
}

module.exports = {
  deleteMission,
  upsertMission,
};
