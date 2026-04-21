import { Response } from "express";
import { catchAsync } from "../utils/catch-async";
import { AuthRequest } from "../config/auth-request-config";
import { client } from "@repo/db";
import { updateAndCreateProductSchema } from "../types";

export const getAllProducts = catchAsync(
    async (_req: AuthRequest, res: Response) => {
        const products = await client.product.findMany({
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
        });

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, data: product });
    }
);

export const createProduct = catchAsync(
    async (req: AuthRequest, res: Response) => {

        const { data, success } = updateAndCreateProductSchema.safeParse(req.body);

        if (!success) {
            return res.status(400).json({ success: false, message: "Invalid request data", errors: data });
        }
        const { name, description, price, polarProductId } = data;

        const product = await client.product.create({
            data: { name: name ?? "", description, price: price ?? 0, polarProductId },
        });

        res.status(201).json({ success: true, data: product });
    }
);

export const updateProduct = catchAsync(
    async (req: AuthRequest, res: Response) => {
        const id = req.params.id as string;

        const { data, success } = updateAndCreateProductSchema.safeParse(req.body);

        if (!success) {
            return res.status(400).json({ success: false, message: "Invalid request data", errors: data });
        }

        const { name, description, price, polarProductId } = data;

        const existing = await client.product.findUnique({ where: { id } });
        if (!existing) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        const product = await client.product.update({
            where: { id },
            data: { name, description, price, polarProductId },
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
