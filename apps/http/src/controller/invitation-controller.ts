import { AuthRequest } from "../config/auth-request-config";
import { InviteAcceptAdminSchema, InviteAdminSchema, RequestInvitationSchema } from "../types";
import { AppError } from "../utils/app-error";
import { catchAsync } from "../utils/catch-async.js";
import { Response } from "express";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { client } from "@repo/db";

export const inviteAdmin = catchAsync(
    async (req: AuthRequest, res: Response) => {
        try {
            const { data, success } = InviteAdminSchema.safeParse(req.body);
            const role = req.role;
            const userId = req.userId;

            if (!success) {
                throw new AppError("User not found", 404);
            }

            const token = crypto.randomUUID().replace(/-/g, "");
            const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

            const existingUser = await client.user.findUnique({
                where: {
                    email: data?.email!,
                },
            });

            if (existingUser) {
                throw new AppError("User with this email already exists", 400);
            }

            const existingInvitation = await client.invitation.findFirst({
                where: {
                    email: data?.email!,
                },
            });

            if (existingInvitation) {
                throw new AppError("Invitation already exists for this email", 400);
            }

            const invitation = await client.invitation.create({
                data: {
                    email: data.email,
                    token: tokenHash,
                    invitedBy: userId!,
                    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // Expires in 1 day
                },
            });

            // TODO: Send email to the invited admin with the invitation link containing the token

            if (!invitation) {
                throw new AppError("Failed to create invitation", 500);
            }

            res.status(200).json({
                success: true,
                message: "Admin invite sent successfully",
            });

        } catch (e) {
            console.error(e);
            res.status(500).json({
                success: false,
                message: "Failed to server request",
            })
        }
    }
);

export const isInvitationValid = catchAsync(
    async (req: AuthRequest, res: Response) => {
        try {
            const invitationToken = req.params.invitationToken as string;
            const tokenHash = crypto.createHash("sha256").update(invitationToken).digest("hex");
            const invitation = await client.invitation.findFirst({
                where: {
                    token: tokenHash,
                    expiresAt: {
                        gt: new Date(),
                    },
                },
            });

            if (!invitation) {
                throw new AppError("Invalid or expired invitation token", 400);
            }

            res.status(200).json({
                success: true,
                message: "Invitation is valid",
            });

        } catch (e) {
            console.error(e);
            res.status(500).json({
                success: false,
                message: "Failed to server request",
            })
        }
    }
);

export const inviteAccept = catchAsync(
    async (req: AuthRequest, res: Response) => {
        try {
            const invitationToken = req.params.invitationToken as string;
            const tokenHash = crypto.createHash("sha256").update(invitationToken).digest("hex");

            const invitation = await client.invitation.findFirst({
                where: {
                    token: tokenHash,
                    expiresAt: {
                        gt: new Date(),
                    },
                },
            });

            if (!invitation) {
                throw new AppError("Invalid or expired invitation token", 400);
            };

            const { data, success } = InviteAcceptAdminSchema.safeParse(req.body);

            if (!success) {
                throw new AppError("Invalid input data", 400);
            }

            const existingUser = await client.user.findUnique({
                where: {
                    email: data?.email!,
                },
            });

            if (existingUser) {
                throw new AppError("User with this email already exists", 400);
            }

            const passwordHash = await bcrypt.hash(data.password, 10);

            const newUser = await client.user.create({
                data: {
                    email: data.email,
                    name: data.name,
                    password: passwordHash,
                    role: "ADMIN",
                },
            });

            res.status(200).json({
                success: true,
                message: "Admin account created successfully",
            });

        } catch (e) {
            console.error(e);
            res.status(500).json({
                success: false,
                message: "Failed to server request",
            })
        }
    }
);

export const requestInvitation = catchAsync(
    async (req: AuthRequest, res: Response) => {
        try {
            const { data, success } = RequestInvitationSchema.safeParse(req.body);

            if (!success) {
                throw new AppError("Invalid input data", 400);
            }

            const existingRequest = await client.requestInvitation.findFirst({
                where: {
                    email: data?.email!,
                },
            });

            if (existingRequest) {
                throw new AppError("You have already requested an invitation", 400);
            }

            await client.requestInvitation.create({
                data: {
                    email: data.email,
                    message: data.message,
                },
            });

            res.status(200).json({
                success: true,
                message: "Invitation request submitted successfully",
            });
        }
        catch (e) {
            console.error(e);
            res.status(500).json({
                success: false,
                message: "Failed to server request",
            })
        }
    }
);

