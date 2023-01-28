module.exports = ({ validator, handler }) => {
  return async (req, res, next) => {
    let refined = {
      ...req.body,
      ...req.query,
      ...req.params,
    };
    try {
      const { data, message, ...others } = await handler(refined);

      return res.status(200).json({
        status: "success",
        message,
        data,
      });
    } catch (err) {
      next(err);
    }
  };
};
