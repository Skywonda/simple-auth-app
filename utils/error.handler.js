module.exports = (err, req, res, next) => {
  const customError = {};
  if (err) {
    customError.statusCode = err.statusCode || 500;
    customError.msg = err.msg || err.message || "Something went wrong!";
  }
  res.statusCode(customError.statusCode).json({
    msg: customError.msg
  })
};
