const { omit } = require("lodash");

var passport = require("passport"),
  GoogleStrategy = require("passport-google-oauth20").Strategy,
  User = require("../../app/models/user"),
  config = require("../index");

module.exports = passport.use(
  new GoogleStrategy(
    {
      clientID: config.google.clientId,
      clientSecret: config.google.secret,
      callbackURL: config.google.callbackUrl,
    },

    async (accessToken, refreshToken, profile, done) => {
      let user = await User.findOne({ googleId: profile.id });

      if (!user) {
        try {
          let newUser = new User({
            googleId: profile.id,
            firstname: profile.name.givenName(),
            lastname: profile.lastname.familyName(),
            email: profile.emails[0].value,
            profileImage: profile.photos[0].value,
          });
          user = omit(newUser.toObject(), ["password", "googleId"]);
          return done(null, user);
        } catch (err) {
          return done(null, false);
        }
      } else {
        user.firstname = profile.name.givenName();
        user.lastname = profile.name.familyName();
        user.profileImage = profile.photos[0].value;

        user.save((err) => {
          if (err) return done(err, false);
          return done(null, user);
        });
      }
    }
  )
);
