const sectionService = require("../services/section.service");
const { imageURL, text } = require("../utils/request");

async function getContactUsSingapore(req, res) {
  const item = await sectionService.getContactUsNamedSection("Singapore");
  res.json(item);
}

async function upsertContactUsSingapore(req, res) {
  const item = await sectionService.upsertContactUsNamedSection("Singapore", {
    description: text(req, "description"),
    imageURL: imageURL(req),
  });

  res.status(201).json(item);
}

async function getContactUsSenegal(req, res) {
  const item = await sectionService.getContactUsNamedSection("Senegal");
  res.json(item);
}

async function upsertContactUsSenegal(req, res) {
  const item = await sectionService.upsertContactUsNamedSection("Senegal", {
    description: text(req, "description"),
    imageURL: imageURL(req),
  });

  res.status(201).json(item);
}

module.exports = {
  getContactUsSenegal,
  getContactUsSingapore,
  upsertContactUsSenegal,
  upsertContactUsSingapore,
};
