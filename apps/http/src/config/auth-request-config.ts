import { Role } from "@repo/db";
import { Request } from "express";

export interface AuthRequest extends Request {
    userId?: string;
    user?: any;
    role?: Role;
    isPremium?: boolean;
};