const requestHandler = require('./index')
const AuthService = require('../services/auth.services')

class AuthController {
  static createUser = requestHandler({
    handler: AuthService.createUser
  })

  static loginUser = requestHandler({
    handler: AuthService.loginUser
  })

  static googleAuthHandler = requestHandler({
    handler: AuthService.googleAuth
  })
}

module.exports = AuthController