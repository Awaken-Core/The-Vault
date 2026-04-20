import { client } from "@repo/db";
import { catchAsync } from "../utils/catch-async";
import { AuthRequest } from "../config/auth-request-config.js";
import { Response } from "express";
import { UserUpdateSchema } from "../types";

// Get current user profile
export const getCurrentUser = catchAsync(
    async (req: AuthRequest, res: Response) => {
        try {
            const user = await client.user.findUnique({
                where: { id: req.userId },
                select: {
                    id: true,
                    name: true,
                    emailVerified: true,
                    image: true,
                    role: true,
                    createdAt: true,
                }
            });

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            res.status(200).json({
                success: true,
                user
            });
        } catch (error) {
            console.error('Get current user error:', error);
            res.status(500).json({
                success: false,
                message: 'Server error while fetching user profile'
            });
        }
    }
);

// Get user profile by ID
export const getUserProfile = catchAsync(
    async (req: AuthRequest, res: Response) => {
        try {
            const { userId } = req.params;

            const user = await client.user.findUnique({
                where: { id: userId as string },
                select: {
                    id: true,
                    name: true,
                    emailVerified: true,
                    image: true,
                    role: true,
                    createdAt: true,
                }
            });

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            res.status(200).json({
                success: true,
                user
            });
        } catch (error) {
            console.error('Get user profile error:', error);
            res.status(500).json({
                success: false,
                message: 'Server error while fetching user profile'
            });
        }
    }
);

// Update user profile
export const updateProfile = catchAsync(
    async (req: AuthRequest, res: Response) => {
        try {
            const {data, success} = UserUpdateSchema.safeParse(req.body);
            const userId = req.userId;

            if (!success) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid input data'
                });
            }

            const updateData: { name?: string, image?: string } = {};
            if (data.name !== undefined) updateData.name = data.name;
            if (data.image !== undefined) updateData.image = data.image;

            const updatedUser = await client.user.update({
                where: { id: userId },
                data: updateData,
                select: {
                    id: true,
                    name: true,
                    emailVerified: true,
                    image: true,
                    role: true,
                    createdAt: true
                }
            });

            res.status(200).json({
                success: true,
                message: 'Profile updated successfully',
                user: updatedUser
            });
        } catch (error) {
            console.error('Update profile error:', error);
            res.status(500).json({
                success: false,
                message: 'Server error while updating profile'
            });
        }
    }
);