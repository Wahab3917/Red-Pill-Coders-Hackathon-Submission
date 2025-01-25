import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import ErrorHandler from "../helpers/ErrorHandler";
import { JWT_SECRET } from "../config/constants";
const authenticationMiddleware = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization");

    if (!token) {
      return ErrorHandler.send(res, 401, "Authentication token is missing");
    }

    try {
      if (!JWT_SECRET) {
        return ErrorHandler.send(res, 404, "JWT_SECRET not found");
      }
      const decoded = jwt.verify(token, JWT_SECRET || "secret_key");

      (req as any).user = decoded;

      next();
    } catch (error) {
      return ErrorHandler.send(res, 401, "Invalid or expired token");
    }
  };
};

export default authenticationMiddleware;
