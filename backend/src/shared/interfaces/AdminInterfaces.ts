import { Document, Types } from "mongoose";

export interface IAdmin extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  profilePic: string;
}

export interface AdminDTOProps {
  _id: Types.ObjectId;
  name: string;
  email: string;
  role: string;
  profilePic: string;
}
