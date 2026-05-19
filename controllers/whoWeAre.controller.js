const sectionService = require("../services/section.service");
const { imageURL, pageId, text } = require("../utils/request");

async function upsertWhoWeAre(req, res) {
  const item = await sectionService.upsertWhoWeAre({
    title: text(req, "title"),
    description: text(req, "description"),
    button: text(req, "button"),
    imageURL: imageURL(req),
    pageId: pageId(req),
  });

  res.status(201).json(item);
}

module.exports = {
  upsertWhoWeAre,
};
