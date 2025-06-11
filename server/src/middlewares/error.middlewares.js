import ApiResponse from "../utils/api-response.js";

const errorMiddleware = (err, req, res, next) => {
  // console.error(err); // Log the error for debugging
  ApiResponse.error(res, err); 
}

export default errorMiddleware;