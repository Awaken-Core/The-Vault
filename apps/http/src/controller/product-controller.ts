import { Response } from "express";
import { catchAsync } from "../utils/catch-async";
import { AuthRequest } from "../config/auth-request-config";
import { client } from "@repo/db";

export const getAllProducts = catchAsync(
    async (_req: AuthRequest, res: Response) => {
        const products = await client.product.findMany({
            include: {
                service: {
                    select: { id: true, name: true },
                },
            },
            orderBy: { createdAt: "desc" },
        });

        res.status(200).json({ success: true, data: products });
    }
);

export const getProductById = catchAsync(
    async (req: AuthRequest, res: Response) => {
        const id = req.params.id as string;

        const product = await client.product.findUnique({
            where: { id },
            include: {
                service: { select: { id: true, name: true } },
            },
        });

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, data: product });
    }
);

export const createProduct = catchAsync(
    async (req: AuthRequest, res: Response) => {
        const { name, description, price, polarProductId, serviceId } = req.body;

        if (!name) {
            return res.status(400).json({ success: false, message: "Product name is required" });
        }

        const product = await client.product.create({
            data: { name, description, price, polarProductId, serviceId },
        });

        res.status(201).json({ success: true, data: product });
    }
);

export const updateProduct = catchAsync(
    async (req: AuthRequest, res: Response) => {
        const id = req.params.id as string;
        const { name, description, price, polarProductId, serviceId } = req.body;

        const existing = await client.product.findUnique({ where: { id } });
        if (!existing) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        const product = await client.product.update({
            where: { id },
            data: { name, description, price, polarProductId, serviceId },
        });

        res.status(200).json({ success: true, data: product });
    }
);

export const deleteProduct = catchAsync(
    async (req: AuthRequest, res: Response) => {
        const id = req.params.id as string;

        const existing = await client.product.findUnique({ where: { id } });
        if (!existing) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        await client.product.delete({ where: { id } });

        res.status(200).json({ success: true, message: "Product deleted" });
    }
);
