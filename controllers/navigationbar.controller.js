const sectionService = require("../services/section.service");
const { deleteById } = require("../utils/http");
const { imageURL, text } = require("../utils/request");

async function getNavigationbar(req, res) {
  const item = await sectionService.getNavigationbar();
  res.json(item);
}

async function upsertNavigationbar(req, res) {
  const item = await sectionService.upsertNavigationbar({
    button: text(req, "button"),
    imageURL: imageURL(req),
  });

  res.status(201).json(item);
}

function deleteNavigationbar(req, res) {
  return deleteById(req, res, sectionService.deleteNavigationbar, "navigationbar");
}

module.exports = {
  deleteNavigationbar,
  getNavigationbar,
  upsertNavigationbar,
};
