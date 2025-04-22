const notFoundError = (req, res, next) => {
  return res.status(404).json({
    statusCode: res.statusCode,
    error: {
      type: "NotFound",
      message: `NotFound ${req.url} route`,
    },
  });
};

const errorHandler = (err, req, res, next) => {
  return res.json({
    statusCode: err.status || 500,
    error: {
      message:
        err.message?.replace(/[\"\'\\]*/g, "") || "internal Server Error",
    },
  });
};

module.exports = {
  notFoundError,
  errorHandler,
};
