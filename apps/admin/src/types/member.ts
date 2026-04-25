import { Role } from "@repo/db";

interface MembersType {
    email: string;
    name: string;
    emailVerified: boolean;
    image: string | null;
    isBanned: boolean;
    createdAt: Date;
    role: Role;
};

export interface BanUserResponse {
    success: boolean;
    message: string;
};

export interface BanMemberPayload {
    userId: string
};

export interface MemberApiResponse {
    success: boolean;
    message: string;
    users: MembersType[];
    admins: MembersType[];
};
