const sectionService = require("../services/section.service");
const { deleteById } = require("../utils/http");
const { imageURL, pageId, text } = require("../utils/request");

function createError(message, statusCode) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function optionalPositiveInteger(value, fieldName) {
  if (value === undefined || value === null || value === "") {
    return undefined;
  }

  const number = Number(value);

  if (!Number.isInteger(number) || number < 1) {
    throw createError(`${fieldName} must be a positive number.`, 400);
  }

  return number;
}

async function listTeamMembers(req, res) {
  const limit = optionalPositiveInteger(req.query.limit, "limit") || 4;

  if (limit > 100) {
    throw createError("limit cannot be greater than 100.", 400);
  }

  const result = await sectionService.listTeamMembers({
    page: optionalPositiveInteger(req.query.page, "page") || 1,
    limit,
    pageId: optionalPositiveInteger(req.query.pageId, "pageId"),
  });

  res.json(result);
}

async function upsertTeamMember(req, res) {
  const item = await sectionService.upsertTeamMember({
    title: text(req, "title"),
    description: text(req, "description"),
    imageURL: imageURL(req),
    pageId: pageId(req),
  });

  res.status(201).json(item);
}

function deleteTeamMember(req, res) {
  return deleteById(req, res, sectionService.deleteTeamMember, "team member");
}

module.exports = {
  deleteTeamMember,
  listTeamMembers,
  upsertTeamMember,
};
