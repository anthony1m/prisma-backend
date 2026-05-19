const sectionService = require("../services/section.service");
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

module.exports = {
  upsertSingaporeLeadership,
};
