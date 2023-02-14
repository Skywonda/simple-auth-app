const express = require("express"),
  router = express.Router();

const passport = require("passport");
const { googleStrategy } = require("../../config/strategies/google");
const AuthController = require("../controller/auth");

router.post("/", AuthController.createUser);
router.post("/login", AuthController.loginUser);

passport.use(googleStrategy);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
router.get("/google/callback", AuthController.googleAuthHandler);

module.exports = router;
