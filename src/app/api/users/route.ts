import dbConnect from "@/app/lib/dbConnect";
import { User } from "@/app/models/User";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { CreateUserDto } from '../../dto/userdto/CreateUserDto';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import bcrypt from 'bcrypt';
import { authMiddleware, roleMiddleware } from '../../middleware/authMiddleware';
import { UserService } from '../../services/userService';

const SECRET_KEY = process.env.JWT_SECRET;
const userService = new UserService();

function generateToken(user: { id: string, role: string }) {
  const payload = {
    sub: user.id,
    role: user.role,
  };
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' }); 
}

export const GET = async (request: NextRequest, p0: any) => {
  await dbConnect();
  try {
    const users = await userService.getAllUsers();
    return NextResponse.json(users);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message });
  }
};



export const POST = async (request: NextRequest, p0: any) => {
  await dbConnect();
  try {
    const body = await request.json();
    const createUserDto = plainToClass(CreateUserDto, body);
    const errors = await validate(createUserDto);
    if (errors.length > 0) {  return NextResponse.json(errors, { status: 400 }); }
    const { name, email, password, role } = createUserDto;
    let user = await userService.getUserByEmail(email);
    if (user) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await userService.createUser({ name, email, password: hashedPassword, role });
    const token = generateToken({ id: user._id.toString(), role });
    return NextResponse.json({ token , message: "User created successfully" }, { status: 201 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ message: 'Error creating user' }, { status: 500 });
  }
};



export const PUT = async (request: NextRequest) => {
  return authMiddleware(request, () => roleMiddleware(request, 'admin', async () => {
    await dbConnect();
    try {
      const { searchParams } = new URL(request.url);
      const id = searchParams.get('id');
      const body = await request.json();
      const updatedUser = await userService.updateUser(id!, body);
      return NextResponse.json(updatedUser);
    } catch (err: any) {
      console.error(err);
      return NextResponse.json({ error: err.message });
    }
  }));
};



export const DELETE = async (request: NextRequest) => {
  return authMiddleware(request, () => roleMiddleware(request, 'admin', async () => {
    await dbConnect();
    try {
      const { searchParams } = new URL(request.url);
      const id = searchParams.get('id');
      await userService.deleteUser(id!);
      return NextResponse.json({ message: 'User deleted successfully' });
    } catch (err: any) {
      console.error(err);
      return NextResponse.json({ error: err.message });
    }
  }));
};




