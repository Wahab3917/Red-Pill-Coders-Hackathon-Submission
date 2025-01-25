import { Document, Types } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  profilePic: string;
}

export interface UserDTOProps {
  _id: Types.ObjectId;
  name: string;
  email: string;
  role: string;
  profilePic: string;
}
