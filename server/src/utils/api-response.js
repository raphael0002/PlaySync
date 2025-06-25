
class ApiResponse {
  /**
   * Send a success response
   * @param {Response} res - Express response object
   * @param {Object} config - Response configuration
   * @param {number} config.code - HTTP status code
   * @param {string} config.message - Human-readable message
   * @param {Object|null} [config.data] - Response payload
   * @param {Object|null} [config.pagination] - Pagination metadata
   * @param {Object|null} [config.meta] - Additional metadata
   */
  static send(res, { code, message, data = null, pagination = null, meta = null }) {
    const response = {
      success: code >= 200 && code < 300,
      code,
      message,
      data,
    };

    if (pagination) {
      response.pagination = pagination;
    }

    if (meta) {
      response.meta = meta;
    }

    return res.status(code).json(response);
  }

  /**
   * Send a paginated response
   * @param {Response} res - Express response object
   * @param {Object} config - Response configuration
   * @param {number} config.code - HTTP status code
   * @param {string} config.message - Human-readable message
   * @param {Array} config.data - Response payload array
   * @param {Object} config.pagination - Pagination details
   * @param {number} config.pagination.total - Total items
   * @param {number} config.pagination.limit - Items per page
   * @param {number} config.pagination.page - Current page
   * @param {number} config.pagination.pages - Total pages
   */
  static paginate(res, { code, message, data, pagination }) {
    return ApiResponse.send(res, {
      code,
      message,
      data,
      pagination: {
        total: pagination.total,
        limit: pagination.limit,
        page: pagination.page,
        pages: Math.ceil(pagination.total / pagination.limit),
      },
    });
  }

  /**
   * Send an error response
   * @param {Response} res - Express response object
   * @param {Error} error - Error object
   */
  static error(res, error) {
    const code = error.statusCode || 500;
    const response = {
      success: false,
      code,
      message: error.message || 'Internal Server Error',
      details : error.details || null,
      stack: error.stack, // to be removed in production
    };

    // Include stack trace in development
    if (process.env.NODE_ENV === 'development') {
      response.stack = error.stack;
    }

    // Validation errors
    if (error.errors) {
      response.errors = error.errors;
    }

    return res.status(code).json(response);
  }
}

export default ApiResponse;