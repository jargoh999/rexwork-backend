import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';


export const authMiddleware = async (request: NextRequest, next: () => Promise<NextResponse>) => {
  if (request.method === 'POST') {
    return next(); // Skip authentication for POST requests
  }
  const token = request.headers.get('authorization')?.split(' ')[1];
  if (!token) {
    return new NextResponse(JSON.stringify({ message: 'Access denied. No token provided.' }), { status: 401 });
  }
  try {
    const decoded = await jwt.verify(token, SECRET_KEY);
    (request as any).user = decoded;
    return next();
  } catch (err) {
    return new NextResponse(JSON.stringify({ message: 'Invalid token.' }), { status: 403 });
  }
};

export const roleMiddleware = async (request: NextRequest, role: string, next: () => Promise<NextResponse>) => {
  const user = (request as any).user;
  if (user.role !== role) {
    return new NextResponse(JSON.stringify({ message: 'Forbidden' }), { status: 403 });
  }
  return next();
};
