import mongoose, { Document, Model, Schema } from "mongoose";
import { DEFAULT_USER } from "../../config/constants";
import { IUser } from "../../shared";

const userModel: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minLenght: [3, "Name must be at least 3 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email must be unique"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      default: "user",
    },
    profilePic: {
      type: String,
      default: DEFAULT_USER,
    },
  },
  { timestamps: true }
);

const UserModel: Model<IUser> = mongoose.model<IUser>("User", userModel);

export default UserModel;
