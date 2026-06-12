const sectionService = require("../services/section.service");
const { deleteById } = require("../utils/http");
const { imageURL, pageId, text } = require("../utils/request");

async function upsertSingaporeLeadership(req, res) {
  const item = await sectionService.upsertSingaporeLeadership({
    title: text(req, "title"),
    description: text(req, "description"),
    imageURL: imageURL(req),
    pageId: pageId(req),
  });

  res.status(201).json(item);
}

function deleteSingaporeLeadership(req, res) {
  return deleteById(
    req,
    res,
    sectionService.deleteSingaporeLeadership,
    "singapore leadership"
  );
}

module.exports = {
  deleteSingaporeLeadership,
  upsertSingaporeLeadership,
};
