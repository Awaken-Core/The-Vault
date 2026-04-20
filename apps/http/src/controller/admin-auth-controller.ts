import { AuthRequest } from "../config/auth-request-config";
import { AppError } from "../utils/app-error";
import { catchAsync } from "../utils/catch-async.js";
import { Response } from "express";
import { client } from "@repo/db";

export const BanUser = catchAsync(
    async (req: AuthRequest, res: Response) => {
        try {
            const userIdToBlock = req.params.userId as string;
            const user = await client.user.findUnique({
                where: {
                    id: userIdToBlock,
                },
            });

            if (!user) {
                throw new AppError("User not found", 404);
            }

            await client.user.update({
                where: {
                    id: userIdToBlock,
                },
                data: {
                    isBanned: !user.isBanned, // Toggle block status
                },
            });

            res.status(200).json({
                success: true,
                message: user.isBanned ? "User unblocked successfully" : "User blocked successfully",
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

