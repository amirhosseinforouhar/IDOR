const mongoose = require("mongoose");

const errorHandler = (err, req, res, next) => {
  let errorName = err.errorName || "INTERNAL_SERVER_ERROR";
  let message = err.message || "Internal Server Error";
  let statusCode = err.statusCode || 500;

  if (err instanceof mongoose.Error.ValidationError) {
    errorName = "BAD_REQUEST_ERROR";
    message = Object.values(err.errors)
      .map((error) => error.message)
      .join(",");
    statusCode = 400;
  }

  if (err instanceof mongoose.Error.CastError) {
    message = "user not found"
    statusCode = 404 
    errorName = "NOT_FOUND_ERROR"
  }

  res.status(statusCode).json({
    error: errorName,
    message,
    status: statusCode,
  });
};

module.exports = errorHandler;
