const sectionService = require("../services/section.service");
const { deleteById } = require("../utils/http");
const {
  imageURL,
  optionalPageId,
  pageId,
  text,
} = require("../utils/request");

async function listStrategicObjectives(req, res) {
  const section = await sectionService.listStrategicObjectives(optionalPageId(req));
  res.json(section);
}

async function upsertStrategicObjective(req, res) {
  const item = await sectionService.upsertStrategicObjective({
    id: req.body.id,
    description: text(req, "description"),
    imageURL: imageURL(req),
    pageId: pageId(req),
  });

  res.status(201).json(item);
}

function deleteStrategicObjective(req, res) {
  return deleteById(
    req,
    res,
    sectionService.deleteStrategicObjective,
    "strategic objective"
  );
}

module.exports = {
  deleteStrategicObjective,
  listStrategicObjectives,
  upsertStrategicObjective,
};
