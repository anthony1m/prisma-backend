const sectionService = require("../services/section.service");
const { deleteById } = require("../utils/http");
const { optionalImageURL, optionalText } = require("../utils/request");

async function getContactUsSingapore(req, res) {
  const item = await sectionService.getContactUsNamedSection("Singapore");
  res.json(item);
}

async function upsertContactUsSingapore(req, res) {
  const item = await sectionService.upsertContactUsNamedSection("Singapore", {
    description: optionalText(req, "description"),
    phone: optionalText(req, "phone"),
    address: optionalText(req, "address"),
    email: optionalText(req, "email"),
    imageURL: optionalImageURL(req),
  });

  res.status(201).json(item);
}

function deleteContactUsSingapore(req, res) {
  return deleteById(
    req,
    res,
    (id) => sectionService.deleteContactUsNamedSection("Singapore", id),
    "contact us singapore section"
  );
}

async function getContactUsSenegal(req, res) {
  const item = await sectionService.getContactUsNamedSection("Senegal");
  res.json(item);
}

async function upsertContactUsSenegal(req, res) {
  const item = await sectionService.upsertContactUsNamedSection("Senegal", {
    description: optionalText(req, "description"),
    phone: optionalText(req, "phone"),
    address: optionalText(req, "address"),
    email: optionalText(req, "email"),
    imageURL: optionalImageURL(req),
  });

  res.status(201).json(item);
}

function deleteContactUsSenegal(req, res) {
  return deleteById(
    req,
    res,
    (id) => sectionService.deleteContactUsNamedSection("Senegal", id),
    "contact us senegal section"
  );
}

module.exports = {
  deleteContactUsSenegal,
  deleteContactUsSingapore,
  getContactUsSenegal,
  getContactUsSingapore,
  upsertContactUsSenegal,
  upsertContactUsSingapore,
};
