import { Types } from "mongoose";
import { UserDTOProps } from "../../shared";

class UserDTO {
  _id: Types.ObjectId;
  name: string;
  email: string;
  role: string;
  profilePic?: string;

  constructor(user: UserDTOProps) {
    this._id = user._id;
    this.name = user.name;
    this.email = user.email;
    this.role = user.role;
    this.profilePic = user.profilePic;
  }
}

export default UserDTO;
