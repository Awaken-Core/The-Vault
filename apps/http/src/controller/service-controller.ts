import { Response } from "express";
import { catchAsync } from "../utils/catch-async";
import { AuthRequest } from "../config/auth-request-config";
import { client } from "@repo/db";
import { createServiceSchema, updateSServiceSchema } from "../types";

export const getAllServices = catchAsync(
    async (_req: AuthRequest, res: Response) => {
        const services = await client.service.findMany({
            orderBy: { createdAt: "desc" },
        });

        res.status(200).json({ success: true, data: services });
    }
);

export const getServiceById = catchAsync(
    async (req: AuthRequest, res: Response) => {
        const id = req.params.id as string;

        const service = await client.service.findUnique({
            where: { id },
        });

        if (!service) {
            return res.status(404).json({ success: false, message: "Service not found" });
        }

        res.status(200).json({ success: true, data: service });
    }
);

export const createService = catchAsync(
    async (req: AuthRequest, res: Response) => {

        const { data, success } = createServiceSchema.safeParse(req.body);

        if (!success) {
            return res.status(400).json({ success: false, message: "Invalid request data", errors: data });
        }
        
        const { name, description } = data;

        if (!name) {
            return res.status(400).json({ success: false, message: "Service name is required" });
        }

        const service = await client.service.create({
            data: { name, description },
        });

        res.status(201).json({ success: true, data: service });
    }
);

export const updateService = catchAsync(
    async (req: AuthRequest, res: Response) => {
        const id = req.params.id as string;

        const { data, success } = updateSServiceSchema.safeParse(req.body);

        if (!success) {
            return res.status(400).json({ success: false, message: "Invalid request data", errors: data });
        }

        const { name, description } = data;

        const existing = await client.service.findUnique({ where: { id } });
        if (!existing) {
            return res.status(404).json({ success: false, message: "Service not found" });
        }

        const service = await client.service.update({
            where: { id },
            data: { name, description },
        });

        res.status(200).json({ success: true, data: service });
    }
);

export const deleteService = catchAsync(
    async (req: AuthRequest, res: Response) => {
        const id = req.params.id as string;

        const existing = await client.service.findUnique({ where: { id } });
        if (!existing) {
            return res.status(404).json({ success: false, message: "Service not found" });
        }

        await client.service.delete({ where: { id } });

        res.status(200).json({ success: true, message: "Service deleted" });
    }
);
