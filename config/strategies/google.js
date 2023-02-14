const { omit } = require("lodash");

var passport = require("passport"),
  GoogleStrategy = require("passport-google-oauth20").Strategy,
  User = require("../../app/models/user"),
  config = require("../index");

module.exports = {
  googleStrategy: new GoogleStrategy(
    {
      clientID: config.google.clientId,
      clientSecret: config.google.secret,
      callbackURL: config.google.callbackUrl,
      passReqToCallback: true,
    },

    async (req, accessToken, refreshToken, profile, done) => {
      let user = await User.findOne({ provider_id: profile.id, provider: 'google' });

      if (!user) {
        try {
          let newUser = new User({
            provider_id: profile.id,
            provider: 'google',
            firstname: profile.name.givenName,
            lastname: profile.name.familyName,
            email: profile.emails[0].value,
            profileImage: profile.photos[0].value,
          });
          await newUser.save()
          user = omit(newUser.toObject(), ["password", "provider_id"]);
          return done(null, user);
        } catch (err) {
          console.log(err)
          return done(err, false);
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
  ),
};
