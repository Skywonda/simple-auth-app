const { ConflictError } = require("../../lib/exception");
const User = require("../models/user");

class UserService {
  static createUser = async ({ account }) => {
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

  static getUsers = async ({ account }) => {
    return {
      users: await User.find({}),
    };
  };
}

module.exports = UserService;
