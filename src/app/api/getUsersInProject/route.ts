import dbConnect from "@/app/lib/dbConnect";
import { ProjectService } from "@/app/services/projectService";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

const projectService = new ProjectService();

export const GET = async (request: NextRequest) => {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const  projectId  = searchParams.get('id');
    try {
      const users = await projectService.getAllUsersInProject(projectId!);
      if (!users) {
          return NextResponse.json ({error : 'Users not found' });
      }
      return NextResponse.json ({users ,message : 'Users found successfully' });

  } catch (error) {
      NextResponse.json({ error: error });
  }
};
