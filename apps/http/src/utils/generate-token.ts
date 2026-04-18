import jwt from 'jsonwebtoken';
import { server_env as env } from '@repo/env';

export const generateToken = (userId: string) => {
    return jwt.sign({ userId }, env.JWT_SECRET, { expiresIn: '7d' });
};