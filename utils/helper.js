let jwt = require("jsonwebtoken"),
  argon = require("argon2"),
  config = require("../config/index"),
  User = require("../app/models/user");

const verifyUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) return false;
  const validPassword = await argon.verify(user.password, password);
  if (!validPassword) return false;
  return user;
};
const hashToken = (payload) => {
  const token = jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiry,
    algorithm: "HS256",
  });
  return token;
};

const verifyPassword = (hash, plain) => {
  return argon.verify(hash, plain);
};

module.exports = {
  hashToken,
  verifyUser,
  verifyPassword,
};
