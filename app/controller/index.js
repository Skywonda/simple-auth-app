module.exports = ({ validator, handler }) => {
  return async (req, res, next) => {
    let refined = {
      ...req.body,
      ...req.query,
      ...req.params,
    };
    try {
      const { data, message, ...others } = await handler(
        refined,
        req,
        res,
      );
      if (data === 'google') return

      return res
        .cookie(data ? data.token : null)
        .status(200)
        .json({
          status: "success",
          message,
          data,
          ...others,
        });
    } catch (err) {
      console.log(err)
      return next(err);
    }
  };
};
