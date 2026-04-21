import { Response } from "express";
import { catchAsync } from "../utils/catch-async";
import { AuthRequest } from "../config/auth-request-config";
import { client } from "@repo/db";
import { addServicePurchaseInstallmentSchema, createProductPurchaseSchema, createServicePurchaseSchema, updateInstallmentStatusSchema, updateProductPurchaseStatusSchema, updateServicePurchaseStatusSchema } from "../types";

// ==================== PRODUCT PURCHASE ====================

export const createProductPurchase = catchAsync(
    async (req: AuthRequest, res: Response) => {
        const { data, success, error } = createProductPurchaseSchema.safeParse(req.body);

        if (!success) {
            return res.status(400).json({ success: false, message: "Invalid request data", errors: error.message });
        };

        const { productIds, currency = "usd" } = data;

        const products = await client.product.findMany({
            where: { id: { in: productIds } },
        });

        if (products.length !== productIds.length) {
            return res.status(400).json({ success: false, message: "One or more products not found" });
        }

        const totalAmount = products.reduce((sum, p) => sum + Number(p.price), 0);

        const purchase = await client.productPurchase.create({
            data: {
                userId: req.userId!,
                amount: totalAmount,
                currency,
                products: { connect: productIds.map((id: string) => ({ id })) },
            },
            include: {
                products: { select: { id: true, name: true, price: true } },
            },
        });

        res.status(201).json({ success: true, data: purchase });
    }
);

export const getMyProductPurchases = catchAsync(
    async (req: AuthRequest, res: Response) => {
        const purchases = await client.productPurchase.findMany({
            where: { userId: req.userId },
            include: {
                products: { select: { id: true, name: true, price: true } },
            },
            orderBy: { createdAt: "desc" },
        });

        res.status(200).json({ success: true, data: purchases });
    }
);

export const getAllProductPurchases = catchAsync(
    async (_req: AuthRequest, res: Response) => {
        const purchases = await client.productPurchase.findMany({
            include: {
                user: { select: { id: true, email: true, name: true } },
                products: { select: { id: true, name: true, price: true } },
            },
            orderBy: { createdAt: "desc" },
        });

        res.status(200).json({ success: true, data: purchases });
    }
);

export const getProductPurchaseById = catchAsync(
    async (req: AuthRequest, res: Response) => {
        const id = req.params.id as string;

        const purchase = await client.productPurchase.findUnique({
            where: { id },
            include: {
                user: { select: { id: true, email: true, name: true } },
                products: { select: { id: true, name: true, price: true } },
            },
        });

        if (!purchase) {
            return res.status(404).json({ success: false, message: "Purchase not found" });
        }

        if (req.role !== "ADMIN" && purchase.userId !== req.userId) {
            return res.status(403).json({ success: false, message: "Forbidden" });
        }

        res.status(200).json({ success: true, data: purchase });
    }
);

export const updateProductPurchaseStatus = catchAsync(
    async (req: AuthRequest, res: Response) => {
        const id = req.params.id as string;

        const { data, success, error } = updateProductPurchaseStatusSchema.safeParse(req.body);

        if (!success) {
            return res.status(400).json({ success: false, message: "Invalid request data", errors: error.message });
        }

        const { status } = data;

        const existing = await client.productPurchase.findUnique({ where: { id } });
        if (!existing) {
            return res.status(404).json({ success: false, message: "Purchase not found" });
        }

        const purchase = await client.productPurchase.update({
            where: { id },
            data: { status },
        });

        res.status(200).json({ success: true, data: purchase });
    }
);

// ==================== SERVICE PURCHASE ====================

export const createServicePurchase = catchAsync(
    async (req: AuthRequest, res: Response) => {
        const { data, success } = createServicePurchaseSchema.safeParse(req.body);

        if (!success) {
            return res.status(400).json({ success: false, message: "Invalid request data", errors: data });
        }

        const { serviceIds, amount, currency = "usd", installmentCount = 1 } = data;

        if (!serviceIds || !Array.isArray(serviceIds) || serviceIds.length === 0) {
            return res.status(400).json({ success: false, message: "At least one serviceId is required" });
        };

        if (amount === undefined) {
            return res.status(400).json({ success: false, message: "amount is required" });
        }

        const services = await client.service.findMany({
            where: { id: { in: serviceIds } },
        });

        if (services.length !== serviceIds.length) {
            return res.status(400).json({ success: false, message: "One or more services not found" });
        }

        const purchase = await client.servicePurchase.create({
            data: {
                userId: req.userId!,
                amount,
                currency,
                installmentCount,
                services: { connect: serviceIds.map((id: string) => ({ id })) },
            },
            include: {
                services: { select: { id: true, name: true } },
            },
        });

        res.status(201).json({ success: true, data: purchase });
    }
);

export const getMyServicePurchases = catchAsync(
    async (req: AuthRequest, res: Response) => {
        const purchases = await client.servicePurchase.findMany({
            where: { userId: req.userId },
            include: {
                services: { select: { id: true, name: true } },
                installments: { orderBy: { number: "asc" } },
            },
            orderBy: { createdAt: "desc" },
        });

        res.status(200).json({ success: true, data: purchases });
    }
);

export const getAllServicePurchases = catchAsync(
    async (_req: AuthRequest, res: Response) => {
        const purchases = await client.servicePurchase.findMany({
            include: {
                user: { select: { id: true, email: true, name: true } },
                services: { select: { id: true, name: true } },
                installments: { orderBy: { number: "asc" } },
            },
            orderBy: { createdAt: "desc" },
        });

        res.status(200).json({ success: true, data: purchases });
    }
);

export const getServicePurchaseById = catchAsync(
    async (req: AuthRequest, res: Response) => {
        const id = req.params.id as string;

        const purchase = await client.servicePurchase.findUnique({
            where: { id },
            include: {
                user: { select: { id: true, email: true, name: true } },
                services: { select: { id: true, name: true } },
                installments: { orderBy: { number: "asc" } },
            },
        });

        if (!purchase) {
            return res.status(404).json({ success: false, message: "Service purchase not found" });
        }

        if (req.role !== "ADMIN" && purchase.userId !== req.userId) {
            return res.status(403).json({ success: false, message: "Forbidden" });
        }

        res.status(200).json({ success: true, data: purchase });
    }
);

export const updateServicePurchaseStatus = catchAsync(
    async (req: AuthRequest, res: Response) => {
        const id = req.params.id as string;

        const { data, success, error } = updateServicePurchaseStatusSchema.safeParse(req.body);

        if (!success) {
            return res.status(400).json({ success: false, message: "Invalid request data", errors: error.message });
        }

        const { status } = data;

        const existing = await client.servicePurchase.findUnique({ where: { id } });
        if (!existing) {
            return res.status(404).json({ success: false, message: "Service purchase not found" });
        }

        const purchase = await client.servicePurchase.update({
            where: { id },
            data: { status },
        });

        res.status(200).json({ success: true, data: purchase });
    }
);

// ==================== SERVICE PURCHASE INSTALLMENTS ====================

export const getServicePurchaseInstallments = catchAsync(
    async (req: AuthRequest, res: Response) => {
        const servicePurchaseId = req.params.servicePurchaseId as string;

        const purchase = await client.servicePurchase.findUnique({ where: { id: servicePurchaseId } });
        if (!purchase) {
            return res.status(404).json({ success: false, message: "Service purchase not found" });
        }

        if (req.role !== "ADMIN" && purchase.userId !== req.userId) {
            return res.status(403).json({ success: false, message: "Forbidden" });
        }

        const installments = await client.servicePurchaseInstallment.findMany({
            where: { servicePurchaseId },
            orderBy: { number: "asc" },
        });

        res.status(200).json({ success: true, data: installments });
    }
);

export const addServicePurchaseInstallment = catchAsync(
    async (req: AuthRequest, res: Response) => {
        const servicePurchaseId = req.params.servicePurchaseId as string;

        const { data, success } = addServicePurchaseInstallmentSchema.safeParse(req.body);

        if (!success) {
            return res.status(400).json({ success: false, message: "Invalid request data", errors: data });
        }

        const { number, amount, dueDate } = data;

        const purchase = await client.servicePurchase.findUnique({ where: { id: servicePurchaseId } });
        if (!purchase) {
            return res.status(404).json({ success: false, message: "Service purchase not found" });
        }

        const installment = await client.servicePurchaseInstallment.create({
            data: { servicePurchaseId, number, amount, dueDate: new Date(dueDate) },
        });

        res.status(201).json({ success: true, data: installment });
    }
);

export const updateInstallmentStatus = catchAsync(
    async (req: AuthRequest, res: Response) => {
        const installmentId = req.params.installmentId as string;

        const { data, success, error } = updateInstallmentStatusSchema.safeParse(req.body);

        if (!success) {
            return res.status(400).json({ success: false, message: "Invalid request data", errors: error.message });
        }

        const { status, paidAt } = data;

        const installment = await client.servicePurchaseInstallment.findUnique({ where: { id: installmentId } });
        if (!installment) {
            return res.status(404).json({ success: false, message: "Installment not found" });
        }

        const updated = await client.servicePurchaseInstallment.update({
            where: { id: installmentId },
            data: {
                status,
                paidAt: status === "PAID" ? (paidAt ? new Date(paidAt) : new Date()) : null,
            },
        });

        res.status(200).json({ success: true, data: updated });
    }
);
