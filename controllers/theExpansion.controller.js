const sectionService = require("../services/section.service");
const { optionalImageURL, pageId, text } = require("../utils/request");

async function listTheExpansions(req, res) {
  const id = req.query.pageId ? Number(req.query.pageId) : undefined;

  if (req.query.pageId && !Number.isInteger(id)) {
    throw new Error("pageId must be a number.");
  }

  const items = await sectionService.listTheExpansions(id);
  res.json(items);
}

async function upsertTheExpansion(req, res) {
  const item = await sectionService.upsertTheExpansion({
    title: text(req, "title"),
    description: text(req, "description"),
    imageURL: optionalImageURL(req),
    pageId: pageId(req),
  });

  res.status(201).json(item);
}

module.exports = {
  listTheExpansions,
  upsertTheExpansion,
};
