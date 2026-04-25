import jwt from 'jsonwebtoken';
import { server_env as env } from '@repo/env';
import { Role } from '@repo/db';

export const generateToken = (userId: string, role: Role) => {
    return jwt.sign({ userId, role }, env.JWT_SECRET, { expiresIn: '7d' });
};