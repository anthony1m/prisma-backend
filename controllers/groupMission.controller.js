const sectionService = require("../services/section.service");
const { deleteById } = require("../utils/http");
const { imageURL, pageId, text } = require("../utils/request");

async function upsertGroupMission(req, res) {
  const item = await sectionService.upsertGroupMission({
    title: text(req, "title"),
    description: text(req, "description"),
    imageURL: imageURL(req),
    pageId: pageId(req),
  });

  res.status(201).json(item);
}

function deleteGroupMission(req, res) {
  return deleteById(req, res, sectionService.deleteGroupMission, "group mission");
}

module.exports = {
  deleteGroupMission,
  upsertGroupMission,
};
