function createError(message, statusCode) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function firstValue(value) {
  return Array.isArray(value) ? value[0] : value;
}

function requiredPositiveId(value, fieldName = "id") {
  const resolvedValue = firstValue(value);
  const id = Number(resolvedValue);

  if (!Number.isInteger(id) || id < 1) {
    throw createError(`${fieldName} must be a positive number.`, 400);
  }

  return id;
}

async function deleteById(req, res, deleteAction, sectionName) {
  const id = requiredPositiveId(req.params.id);
  const result = await deleteAction(id);

  if (!result?.count) {
    throw createError(`${sectionName} was not found.`, 404);
  }

  res.json({
    success: true,
    message: `Deleted ${sectionName} ${id}`,
  });
}

module.exports = {
  createError,
  deleteById,
  requiredPositiveId,
};
