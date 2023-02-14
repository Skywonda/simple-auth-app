const passport = require("passport");
const { ConflictError, AuthenticationError } = require("../../lib/exception");
const { verifyUser, hashToken } = require("../../utils/helper");
const User = require("../models/user");

class AuthService {
  static createUser = async (account) => {
    const user = await User.findOne({ email: account.email });
    if (user) {
      throw new ConflictError("This user already exist!");
    }
    return {
      data: {
        ...(await User.create(account)).toObject(),
        password: undefined,
      },
    };
  };

  static loginUser = async ({ email, password }) => {
    const user = await verifyUser({ email, password });
    if (!user) throw new AuthenticationError("Invalid Credentials");
    const token = hashToken({
      id: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
    });
    return {
      message: "Login successful!",
      data: { token },
    };
  };

  static googleAuth = async (_, req, res) => {
    passport.authenticate("google", { session: false }, async (err, user) => {
      return user
    })(req, res.json({ msg: 'Login successful!' }))
    return { data: 'google' }
  };

  static getUsers = async ({ account }) => {
    return {
      users: await User.find({}),
    };
  };
}

module.exports = AuthService;
