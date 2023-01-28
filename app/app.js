var express = require("express"),
  morgan = require("morgan"),
  passport = require("passport"),
  router = require("../app/routes/index");

module.exports = function () {
  var app = express();

  app.use(express.json());
  app.use(morgan("dev"));

  app.use(passport.initialize());

  app.use(router);

  return app;
};
