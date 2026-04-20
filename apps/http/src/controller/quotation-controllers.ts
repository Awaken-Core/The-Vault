import { AuthRequest } from "../config/auth-request-config";
import { catchAsync } from "../utils/catch-async";
import { Response } from "express";
import { client } from "@repo/db";

export const getAllQuotations = catchAsync(
    async (req: AuthRequest, res: Response) => {
        try {
            const quotations = await client.quotation.findMany({
                include: {
                    user: {
                        select: {
                            id: true,
                            email: true,
                        },
                    },
                },
            });

            res.status(200).json({
                success: true,
                data: quotations,
            });
        }
        catch (e) {
            console.error(e);
            res.status(500).json({
                success: false,
                message: "Failed to fetch quotations",
            });
        }
    }
);
