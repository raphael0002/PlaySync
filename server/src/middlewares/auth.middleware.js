import { verifyToken } from "../utils/auth.utils.js";
import {
  UnauthorizedError,
  ForbiddenError,
} from "../utils/error.utils.js";
import prisma from "../config/db.js";

const authMiddleware =
  (requiredRoles = []) =>
  async (req, res, next) => {
    try {
      let token = null;
      // Check Authorization header
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
      }
      // Fallback to cookie
      if (!token && req.cookies.token) {
        token = req.cookies.token;
      }

      if (!token) {
        throw new UnauthorizedError("No token provided");
      }

      const decoded = verifyToken(token);

      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
        },
      });

      if (!user) {
        throw new UnauthorizedError("User not found");
      }

      if (
        requiredRoles.length &&
        !requiredRoles.includes(user.role)
      ) {
        throw new ForbiddenError(
          "Insufficient permissions"
        );
      }

      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  };

export default authMiddleware;
