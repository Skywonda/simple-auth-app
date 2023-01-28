let jwt = require("jsonwebtoken"),
  argon = require("argon2"),
  config = require("../config/index");

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
  verifyPassword,
};
