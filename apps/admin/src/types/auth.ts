import { Role } from "@repo/db";

export interface User {
    id: string;
    name: string;
    email?: string;
    image: string | null;
    emailVerified: boolean;
    role: Role;
    createdAt?: string;
}

export interface AuthResponse {
    success: boolean;
    message: string;
    token: string;
    user: User;
}

export interface ProfileResponse {
    success: boolean;
    user: User;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    email: string;
    name: string;
    password: string;
}

export interface GoogleLoginPayload {
    googleToken: string;
}
