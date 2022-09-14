import { Schema } from "mongoose";
import User from "../Domain/User";
  
const UserSchema = new Schema<User>({
   email: { type: String }
   }, { collection: 'User', versionKey: false })

export default UserSchema;