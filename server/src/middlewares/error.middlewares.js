import { Prisma } from "@prisma/client";
import * as  StatusCodes from '../utils/status-code.js';
import ApiResponse from "../utils/api-response.js";

const errorMiddleware = (err, req, res, next) => {
  // Handle Prisma Known Request Errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    return ApiResponse.error(res, {
      code: 400, // or more specific codes based on error.code
      message: "Database operation failed",
      details: getCleanPrismaError(err),
    });
  }

  // Handle Prisma Validation Errors
  if (err instanceof Prisma.PrismaClientValidationError) {
    return ApiResponse.error(res, {
      code: StatusCodes.BAD_REQUEST,
      message: "Validation error",
      details: getCleanPrismaError(err),
    });
  }

  // Handle your custom ApiError or other errors
  return ApiResponse.error(res, {
    code: StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || 'Internal server error',
    details: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

// Helper function to clean up Prisma error messages
function getCleanPrismaError(err) {
  switch (err.code) {
    case 'P2002':
      const field = err.meta?.target?.join(', ') || 'field';
      return `${field} already exists`;
    case 'P2025':
      return 'Record not found';
    default:
      return {
        code: err.code,
        message: err.message,
        meta: err.meta || null,
      };
  }
}

export default errorMiddleware;