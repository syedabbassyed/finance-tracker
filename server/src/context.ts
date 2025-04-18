import { PrismaClient } from '../generated/prisma';
import { ExpressContextFunctionArgument } from '@apollo/server/express4';
import jwt from 'jsonwebtoken';
import { ENV } from './config/env';

const prisma = new PrismaClient();

export async function createContext({ req, res }: ExpressContextFunctionArgument & { res: any }) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', ''); // extract JWT from header

  let userID: string | null = null;

  if (token) {
    try {
      const decoded = jwt.verify(token, ENV.JWT_SECRET) as { userID: string };
      userID = decoded.userID;
    } catch (err: any) {
      console.warn('Invalid access token:', err.message);

      if (err.name === 'TokenExpiredError') {
        console.log('Access token expired.');
      }
    }
  }

  return {
    prisma,
    userID,
    res
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
