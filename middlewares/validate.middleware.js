function formatIssue(issue) {
  const field = issue.path.join(".");

  return {
    field: field || null,
    message: issue.message,
  };
}


function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body || {});

    if (!result.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: result.error.issues.map(formatIssue),
      });
    }

    req.body = result.data;
    next();
  };
}

module.exports = validate;
