import express from 'express';
import { UserService } from '../../services/userService';
import { NextRequest, NextResponse } from 'next/server';
import { authMiddleware, roleMiddleware } from '@/app/middleware/authMiddleware';
import dbConnect from '@/app/lib/dbConnect';
import { User } from '@/app/models/User';
import { ProjectService } from '@/app/services/projectService';

const userService = new UserService();

const projectService = new ProjectService();

export const POST = async (request: NextRequest) => {
      await dbConnect();
      try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('userId');
        const body = await request.json();
        const project = await userService.createProjectForUser(id!, body);
        return NextResponse.json(project);
      } catch (err: any) {
        console.error(err);
        return NextResponse.json({ error: err.message });
      }
  };


  
export const GET = async (request: NextRequest) => {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const  userId  = searchParams.get('userId');
    try {
      const user = await User.findById(userId).populate('projects');
      if (!user) {
          return NextResponse.json({ error: 'User not found' });
      }
      return NextResponse.json(user.projects);
  } catch (error) {
      NextResponse.json({ error: error });
  }
};

 export const PUT = async (request: NextRequest) => {
      await dbConnect();
      try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('id');
        const { projectId } = await request.json();
        const updatedUser = await projectService.addMemberToProject(projectId!, userId!);
        return NextResponse.json({updatedUser , message: "User added to project successfully" });
      } catch (err: any) {
        console.error(err);
        return NextResponse.json({ error: err.message });
      }
  };   



  