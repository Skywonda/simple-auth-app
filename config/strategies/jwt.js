var passport = require("passport"),
  { Strategy, ExtractJwt } = require("passport-jwt"),
  User = require("../../app/models/user"),
  config = require("../index");

module.exports = passport.use(
  new Strategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwt.secret,
  },
    async (payload, done) => {
      const user = await User.findById(payload.id)
      if (!user) {
        const err = {
          message: 'UnAuthorized',
          statusCode: 401
        }
        return done(err, false)
      }
      done(null, user)
    }
  )
);

exports.verifyUser = passport.use('jwt', { session: false })
