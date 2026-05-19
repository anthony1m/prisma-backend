function errorHandler(error, req, res, next) {
  res.status(error.statusCode || 400).json({
    error: error.message,
  });
}

module.exports = {
  errorHandler,
};
