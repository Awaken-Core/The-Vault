import { z } from "zod";

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
