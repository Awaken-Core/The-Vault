"use server";

import { redirect } from 'next/navigation';
import { API_BASE } from './constants';
import { cookies } from 'next/headers';

async function getSession() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) return null;

    try {
        const response = await fetch(`${API_BASE}/api/v1/user/me`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
            cache: 'no-store',
        });
        if (!response.ok) return null;
        const data = await response.json();
        return data.user ?? null;
    } catch {
        return null;
    }
}

export const requireAuth = async () => {
    const user = await getSession();
    if (!user) redirect('/sign-in');
    return user;
};

export const requireUnAuth = async () => {
    const user = await getSession();
    if (user) redirect('/');
};

export const redirectToHomeIfSession = async () => {
    const user = await getSession();
    if (user) redirect('/home');
};

export const getDBUser = async () => {
    const user = await getSession();
    if (!user) throw new Error('Not authenticated');
    return user;
};
