import { v2 as cloudinary } from "cloudinary";
import ErrorHandler from "../helpers/ErrorHandler";
import { Response } from "express";

const uploadImage = async (
  res: Response,
  filepath: string,
  options = {}
): Promise<any> => {
  try {
    return await cloudinary.uploader.upload(filepath, options);
  } catch (error: any) {
    return ErrorHandler.send(res, 500, error.message);
  }
};

export default uploadImage;
