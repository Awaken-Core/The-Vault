import { z } from "zod";
import { InstallmentStatus, PurchaseStatus } from "@repo/db/data";

export const UserUpdateSchema = z.object({
    name: z.string().min(1, "Name is required").max(32, "Name must be at most 32 characters"),
    image: z.string().url("Image must be a valid URL"),
});

export const PasswordChangeSchema = z.object({
    currentPassword: z.string().min(6, "Current password must be at least 6 characters").max(32, "Current password must be at most 32 characters"),
    newPassword: z.string().min(6, "New password must be at least 6 characters").max(32, "New password must be at most 32 characters"),
});

export const EmailChangeSchema = z.object({
    newEmail: z.string().email("New email must be a valid email address"),
});

export const RegisterUserSchema = z.object({
    email: z.string().email("Email must be a valid email address"),
    name: z.string().min(2, "Name must be at least 2 characters").max(32, "Name must be at most 32 characters"),
    password: z.string().min(6, "Password must be at least 6 characters").max(32, "Password must be at most 32 characters"),
});

export const LoginUserSchema = z.object({
    email: z.string().email("Email must be a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters").max(32, "Password must be at most 32 characters"),
});

export const GoogleLoginSchema = z.object({
    googleToken: z.string().min(1, "Google token is required"),
});

export const InviteAdminSchema = z.object({
    email: z.string().email("Email must be a valid email address"),
});

export const InviteAcceptAdminSchema = z.object({
    email: z.string().email("Email must be a valid email address"),
    name: z.string().min(2, "Name must be at least 2 characters").max(32, "Name must be at most 32 characters"),
    password: z.string().min(6, "Password must be at least 6 characters").max(32, "Password must be at most 32 characters"),
});

export const RequestInvitationSchema = z.object({
    email: z.string().email("Email must be a valid email address"),
    message: z.string().max(500, "Message must be at most 500 characters").optional(),
});

export const updateProductPurchaseStatusSchema = z.object({
    status: z.nativeEnum(PurchaseStatus, {
        error: () => ({ message: "Status must be one of PENDING, COMPLETED, or CANCELLED" }),
    }),
});

export const updateServicePurchaseStatusSchema = z.object({
    status: z.nativeEnum(PurchaseStatus, {
        error: () => ({ message: "Status must be one of PENDING, COMPLETED, or CANCELLED" }),
    }),
});

export const createProductPurchaseSchema = z.object({
    productIds: z.array(z.string().uuid("Each productId must be a valid UUID")).min(1, "At least one productId is required"),
    currency: z.string().optional(),
});

export const createServicePurchaseSchema = z.object({
    serviceIds: z.array(z.string().uuid("Each serviceId must be a valid UUID")).min(1, "At least one serviceId is required"),
    currency: z.string().optional(),
    amount: z.number().positive("Amount must be a positive number").optional(),
    installmentCount: z.number().int().positive("Installment count must be a positive integer").optional(),
});

export const addServicePurchaseInstallmentSchema = z.object({
    number: z.number().int().positive("Installment number must be a positive integer"),
    amount: z.number().positive("Amount must be a positive number"),
    dueDate: z.string().refine((date) => !isNaN(Date.parse(date)), "Due date must be a valid date string"),
});

export const updateInstallmentStatusSchema = z.object({
    status: z.nativeEnum(InstallmentStatus, {
        error: () => ({ message: "Status must be one of PENDING, PAID, OVERDUE, or FAILED" }),
    }),
    paidAt: z.string().refine((date) => !isNaN(Date.parse(date)), "paidAt must be a valid date string").optional(),
});

export const updateSServiceSchema = z.object({
    name: z.string().min(1, "Name is required").max(100, "Name must be at most 100 characters").optional(),
    description: z.string().max(500, "Description must be at most 500 characters").optional(),
});

export const createServiceSchema = z.object({
    name: z.string().min(1, "Name is required").max(100, "Name must be at most 100 characters"),
    description: z.string().max(500, "Description must be at most 500 characters").optional(),
});

export const updateAndCreateProductSchema = z.object({  
    name: z.string().min(1, "Name is required").max(100, "Name must be at most 100 characters").optional(),
    description: z.string().max(500, "Description must be at most 500 characters").optional(),
    price: z.number().positive("Price must be a positive number").optional(),
    polarProductId: z.string().optional(),
});