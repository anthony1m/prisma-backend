const sectionService = require("../services/section.service");
const { deleteById } = require("../utils/http");
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

function deleteWhoWeAre(req, res) {
  return deleteById(req, res, sectionService.deleteWhoWeAre, "who we are");
}

module.exports = {
  deleteWhoWeAre,
  upsertWhoWeAre,
};
