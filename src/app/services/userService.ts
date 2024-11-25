import { User } from '../models/User';
import { Project } from '../models/Project'; // Assuming Project model is defined in this file

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
    return await User.find({}).populate('projects');
  }

  async createProjectForUser(userId: string, projectData: any) {
    try {
        const project = new Project(projectData);
        await project.save();
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        if (!user.projects || !project.members) {
          user.projects = [];
          project.members = [];
      }
      user.projects.push(project._id);
      project.members.push(user._id);
      await user.save();
      await project.save();
      return project;
     } catch (error) {
        console.error('Error creating project for user:', error);
        throw error;
    }
  }


}