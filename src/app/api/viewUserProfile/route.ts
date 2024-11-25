import dbConnect from "@/app/lib/dbConnect";
import { User } from "@/app/models/User";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

export const getUserFromToken = async (request: NextRequest) => {
    await dbConnect();
    try {
        const token = request.headers.get('Authorization')?.split(' ')[1];
        if (!token) {
            return NextResponse.json({ error: 'Token not provided' }, { status: 400 });
        }

        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
        const user = await User.findById(decoded.sub);
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(user);
    } catch (err: any) {
        console.error('Error retrieving user from token:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
};