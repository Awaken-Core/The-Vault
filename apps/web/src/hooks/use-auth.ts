"use client";

import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { loginApi, registerApi, googleLoginApi, logoutApi, getProfileApi } from '@/api/auth';
import { useAuthStore } from '@/store/auth-store';
import type { AxiosError } from 'axios';

type ApiError = AxiosError<{ message: string }>;

export const useLogin = () => {
    const setUser = useAuthStore((s) => s.setUser);
    const router = useRouter();

    return useMutation({
        mutationFn: loginApi,
        onSuccess: (data) => {
            setUser(data.user);
            toast.success(data.message);
            router.push('/');
        },
        onError: (error: ApiError) => {
            toast.error(error.response?.data?.message ?? 'Login failed');
        },
    });
};

export const useRegister = () => {
    const setUser = useAuthStore((s) => s.setUser);
    const router = useRouter();

    return useMutation({
        mutationFn: registerApi,
        onSuccess: (data) => {
            setUser(data.user);
            toast.success(data.message);
            router.push('/');
        },
        onError: (error: ApiError) => {
            toast.error(error.response?.data?.message ?? 'Registration failed');
        },
    });
};

export const useGoogleLogin = () => {
    const setUser = useAuthStore((s) => s.setUser);
    const router = useRouter();

    return useMutation({
        mutationFn: googleLoginApi,
        onSuccess: (data) => {
            setUser(data.user);
            toast.success(data.message);
            router.push('/');
        },
        onError: (error: ApiError) => {
            toast.error(error.response?.data?.message ?? 'Google login failed');
        },
    });
};

export const useLogout = () => {
    const clearUser = useAuthStore((s) => s.clearUser);
    const router = useRouter();

    return useMutation({
        mutationFn: logoutApi,
        onSuccess: () => {
            clearUser();
            toast.success('Logged out successfully');
            router.push('/sign-in');
        },
        onError: () => {
            toast.error('Logout failed');
        },
    });
};

export const useCurrentUser = () => {
    const setUser = useAuthStore((s) => s.setUser);

    return useQuery({
        queryKey: ['currentUser'],
        queryFn: async () => {
            const data = await getProfileApi();
            setUser(data.user);
            return data.user;
        },
        retry: false,
        staleTime: 1000 * 60 * 5,
    });
};
