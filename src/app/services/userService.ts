import { User } from '../models/User';

export class UserService {


  async createUser(data: any) {
    const user = new User(data);
    return await user.save();
  }

  async getUserById(id: string) {
    return await User.findById(id);
  }

  async getUserByEmail(email: string) {
    return await User.findOne({ email });
  }

  async updateUser(id: string, data: any) {
    return await User.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteUser(id: string) {
    return await User.findByIdAndDelete(id);
  }

  async getAllUsers() {
    return await User.find({});
  }

  
}