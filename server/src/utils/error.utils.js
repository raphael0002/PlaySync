import { BAD_REQUEST, NOT_FOUND, UNAUTHORIZED } from "./status-code.js";
export class ApiError extends Error {
  constructor(statusCode, message, isOperational = true, stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
export class ValidationError extends ApiError {
  constructor(errors) {
    super(BAD_REQUEST, 'Validation failed');
    this.errors = errors;
  }
}
export class NotFoundError extends ApiError {
  constructor(message = 'Resource not found') {
    super(NOT_FOUND, message);
  }
}
export class BadRequestError extends ApiError {
  constructor(message = 'Bad request') {
    super(BAD_REQUEST, message);
  }
}
export class UnauthorizedError extends ApiError {
  constructor(message = 'Unauthorized') {
    super(UNAUTHORIZED, message);
  }
}