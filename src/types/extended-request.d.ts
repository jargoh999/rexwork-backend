import { JwtPayload } from 'jsonwebtoken';


declare global {
  interface Request {
    user?: string | JwtPayload;
  }
}

export {};
