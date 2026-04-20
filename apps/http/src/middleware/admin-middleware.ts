import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/app-error.js";
import jwt from "jsonwebtoken";
import { client } from "@repo/db";
import { server_env as env } from "@repo/env";
import { AuthRequest } from "../config/auth-request-config.js";

export const protect = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        let token;

        // Check for token in Authorization header
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            throw new AppError("Not authorized. Please login.", 401);
        }

        // Verify token
        const decoded = jwt.verify(token, env.JWT_SECRET) as { userId: string };

        // Validate session exists and hasn't expired
        const session = await client.session.findUnique({ where: { token } });
        if (!session || session.expiresAt < new Date()) {
            throw new AppError("Session expired. Please login again.", 401);
        }

        // Get user from database
        const user = await client.user.findUnique({
            where: { id: decoded.userId },
            select: {
                id: true,
                email: true,
                name: true,
                image: true,
                role: true,
            },
        });

        if (!user) {
            throw new AppError("User not found", 404);
        };

        if (user.role !== "ADMIN") {
            throw new AppError("Forbidden. Admins only.", 403);
        }

        req.userId = user.id;
        // req.isPremium = (user.subscriptionTier != "Free" && user.subscriptionStatus === "ACTIVE")
        req.user = user;
        req.role = user.role;
        next();
    } catch (error: any) {
        if (error.name === "JsonWebTokenError") {
            return next(new AppError("Invalid token", 401));
        }
        if (error.name === "TokenExpiredError") {
            return next(new AppError("Token expired", 401));
        }
        next(error);
    }
};

export const authenticate = protect;