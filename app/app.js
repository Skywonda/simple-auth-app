var express = require("express"),
  morgan = require("morgan"),
  passport = require("passport");

module.exports = function () {
  var app = express();

  app.use(express.json());
  app.use(morgan("dev"));

  app.use(passport);

  return app;
};
