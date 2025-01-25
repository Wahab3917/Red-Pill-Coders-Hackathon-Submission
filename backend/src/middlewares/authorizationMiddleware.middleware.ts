import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import ErrorHandler from "../helpers/ErrorHandler";
import { JWT_SECRET } from "../config/constants";

const authorizationMiddleware = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization");

    if (!token) {
      return ErrorHandler.send(res, 401, "Authentication token is missing");
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET || "secret_key") as {
        role: string;
      };

      if (decoded.role !== "admin") {
        return ErrorHandler.send(
          res,
          403,
          "Only admin can access this resource"
        );
      }

      (req as any).user = decoded;
      next();
    } catch (error) {
      console.error("Token verification failed:", error);
      return ErrorHandler.send(res, 401, "Invalid or expired token");
    }
  };
};

export default authorizationMiddleware;
