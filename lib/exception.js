class AppError extends Error {
  constructor(message, statusCode, name) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.name = this.constructor.name;
  }
}

class AuthenticationError extends AppError {
  constructor(message) {
    super(message, 401);
  }
}

class AuthorizationError extends AppError {
  constructor(message) {
    super(message, 403);
  }
}

class NotFoundError extends AppError {
  constructor(message) {
    super(message, 404);
  }
}

class ValidationError extends AppError {
  constructor(errors) {
    super(errors, 422);
  }
}

class ServiceError extends AppError {
  constructor(errors) {
    super(errors, 400);
  }
}

class ConflictError extends AppError {
  constructor(errors) {
    super(errors, 409);
  }
}

module.exports = {
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ValidationError,
  ServiceError,
  ConflictError,
};
