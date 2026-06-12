const sectionService = require("../services/section.service");
const { deleteById } = require("../utils/http");
const { imageURL, pageId, text } = require("../utils/request");

async function upsertOurService(req, res) {
  const item = await sectionService.upsertOurService({
    title: text(req, "title"),
    description: text(req, "description"),
    imageURL: imageURL(req),
    pageId: pageId(req),
  });

  res.status(201).json(item);
}

function deleteOurService(req, res) {
  return deleteById(req, res, sectionService.deleteOurService, "service");
}

module.exports = {
  deleteOurService,
  upsertOurService,
};
