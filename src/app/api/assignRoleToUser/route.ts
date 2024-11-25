import dbConnect from '@/app/lib/dbConnect';
import { authMiddleware, roleMiddleware } from '@/app/middleware/authMiddleware';
import { NextRequest, NextResponse } from 'next/server';
import { UserService } from '../../services/userService';


const userService = new UserService();

export const PUT = async (request: NextRequest) => {
    return authMiddleware(request, () => roleMiddleware(request, 'admin', async () => {
      await dbConnect();
      try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        const { role } = await request.json();
        const updatedUser = await userService.updateUser(id!, { role });
        return NextResponse.json(updatedUser);
      } catch (err: any) {
        console.error(err);
        return NextResponse.json({ error: err.message });
      }
    }));
  };