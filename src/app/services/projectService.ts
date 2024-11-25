import { Project } from '../models/Project';
import { User } from '../models/User';

export class ProjectService {
    // Create a new project
    async createProject(data: any) {
        try {
            const project = new Project(data);
            await project.save();
            return project;
        } catch (error) {
            console.error('Error creating project:', error);
            throw error;
        }
    }

    // Get a project by its ID
    async getProjectById(projectId: string) {
        try {
            const project = await Project.findById(projectId).populate('members');
            if (!project) {
                throw new Error('Project not found');
            }
            return project;
        } catch (error) {
            console.error('Error retrieving project:', error);
            throw error;
        }
    }

    // Update a project
    async updateProject(projectId: string, data: any) {
        try {
            const project = await Project.findByIdAndUpdate(projectId, data, { new: true });
            if (!project) {
                throw new Error('Project not found');
            }
            return project;
        } catch (error) {
            console.error('Error updating project:', error);
            throw error;
        }
    }

    // Delete a project
    async deleteProject(projectId: string) {
        try {
            const project = await Project.findByIdAndDelete(projectId);
            if (!project) {
                throw new Error('Project not found');
            }
            return project;
        } catch (error) {
            console.error('Error deleting project:', error);
            throw error;
        }
    }

    async addMemberToProject(projectId: string, userId: string) {
        try {
            const project = await Project.findById(projectId);
            if (!project) {
                throw new Error('Project not found');
            }
            const user = await User.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }
            if (!project.members.includes(userId)) {
                project.members.push(userId);
                await project.save();
            }
            return project;
        } catch (error) {
            console.error('Error adding member to project:', error);
            throw error;
        }
    }

    async getAllUsersInProject(projectId: string) {
        try {
            const project = await Project.findById(projectId).populate('members');
            if (!project) {
                throw new Error('Project not found');
            }
            return project.members;
        } catch (error) {
            console.error('Error retrieving users in project:', error);
            throw error;
        }
    }
}
