const express = require("express"),
  router = express.Router();

const AuthControler = require("../controller/auth");

router.post("/", AuthControler.createUser);

module.exports = router;
