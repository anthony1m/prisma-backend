const searchService = require("../services/search.service");

function createError(message, statusCode) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function firstValue(value) {
  return Array.isArray(value) ? value[0] : value;
}

function optionalString(value) {
  const resolvedValue = firstValue(value);

  if (!resolvedValue || !String(resolvedValue).trim()) {
    return undefined;
  }

  return String(resolvedValue).trim();
}

function optionalId(value) {
  const resolvedValue = firstValue(value);

  if (resolvedValue === undefined || resolvedValue === null || resolvedValue === "") {
    return undefined;
  }

  const id = Number(resolvedValue);

  if (!Number.isInteger(id) || id < 1) {
    throw createError("id must be a positive number.", 400);
  }

  return id;
}

async function searchContent(req, res) {
  const result = await searchService.searchContent({
    id: optionalId(req.query.id),
    section: optionalString(req.query.section),
  });

  res.json(result);
}

module.exports = {
  searchContent,
};
