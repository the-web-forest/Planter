import { model } from "mongoose";
import User from "../../Domain/User";
import UserSchema from "../../Schemas/User.schema";

export default class UserRepository {
   
    async getUserByEmail(email: string): Promise<User> {
        const userModel = model<User>('User', UserSchema);
        return userModel.findOne({ email })
    }

}