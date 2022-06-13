const STATUS_INTERNAL_ERROR = 400;

module.exports = (err, _req, res, _next) => {
  if (err.code && err.status) {
    return res.status(err.status).json({ message: err.message, cod: err.code });
  }
  return res.status(STATUS_INTERNAL_ERROR).json({ message: err.message });
};