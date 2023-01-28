const requestHandler = require('.')
const UserService = require('../services/user.services')

class AuthControler {
  static createUser = requestHandler({
    handler: UserService.createUser
  })
}

module.exports = AuthControler