import jwt from "jsonwebtoken";
import ErrorHandler from "../helpers/ErrorHandler";
import { Response } from "express";
import { JWT_SECRET } from "../config/constants";

const generateToken = (payload: any, res: Response): any => {
  if (!JWT_SECRET) {
    return ErrorHandler.send(res, 400, "JWT_SECRET is not set");
  }
  return jwt.sign(
    { id: payload._id, name: payload.name, email: payload.email },
    JWT_SECRET,
    { expiresIn: "30d" }
  );
};

export default generateToken;
