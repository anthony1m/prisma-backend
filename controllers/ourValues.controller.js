const sectionService = require("../services/section.service");
const { deleteById } = require("../utils/http");
const { optionalText, pageId, text } = require("../utils/request");

async function upsertOurValue(req, res) {
  const item = await sectionService.upsertOurValue({
    title: text(req, "title"),
    description: optionalText(req, "description"),
    pageId: pageId(req),
  });

  res.status(201).json(item);
}

function deleteOurValue(req, res) {
  return deleteById(req, res, sectionService.deleteOurValue, "our value");
}

module.exports = {
  deleteOurValue,
  upsertOurValue,
};
