import mongoose, { Model, Schema } from "mongoose";
import { DEFAULT_USER } from "../../config/constants";
import { IAdmin } from "../../shared";

const adminModel: Schema<IAdmin> = new Schema(
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
      default: "admin",
    },
    profilePic: {
      type: String,
      default: DEFAULT_USER,
    },
  },
  { timestamps: true }
);

const AdminModel: Model<IAdmin> = mongoose.model<IAdmin>("Admin", adminModel);

export default AdminModel;
