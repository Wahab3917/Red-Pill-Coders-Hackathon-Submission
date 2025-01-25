import { Types } from "mongoose";
import { AdminDTOProps } from "../../shared";

class AdminDTO {
  _id: Types.ObjectId;
  name: string;
  email: string;
  role: string;
  profilePic?: string;

  constructor(admin: AdminDTOProps) {
    this._id = admin._id;
    this.name = admin.name;
    this.email = admin.email;
    this.role = admin.role;
    this.profilePic = admin.profilePic;
  }
}

export default AdminDTO;
