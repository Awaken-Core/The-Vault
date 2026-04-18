"use server";

import { redirect } from 'next/navigation';
import { API_BASE } from './constants';
import { cookies } from 'next/headers';

export const requireAuth = async () => {
    const session = ""

    if (!session) {
        redirect("/sign-in");
    }

    return session;
};

export const requireUnAuth = async () => {
    const session = "";

    if (session) {
        redirect("/");
    }

    return session;
};

export const redirectToHomeIfSession = async () => {
    const session = "";

    if (session) {
        redirect("/home");
    }

    return session;
}

export const getDBUser = async () => {
    const cookieStore = await cookies();

    const response = await fetch(`${API_BASE}/api/v1/user/fetch-user`, {
        method: "GET",
        headers: {
            Cookie: cookieStore.toString(),
        },
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch user");
    }

    const result = await response.json();

    return result.user || [];
};

