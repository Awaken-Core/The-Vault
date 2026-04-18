import axios, { AxiosError } from 'axios';
import { API_BASE } from '@/utils/constants';

export class ApiError extends Error {
    constructor(
        message: string,
        public readonly status: number = 500
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

const axiosInstance = axios.create({
    baseURL: `${API_BASE}/api/v1`,
    withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

async function request<T>(fn: () => Promise<{ data: T }>): Promise<T> {
    try {
        const { data } = await fn();
        return data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new ApiError(
                error.response?.data?.message ?? error.message,
                error.response?.status ?? 500
            );
        }
        throw error;
    }
}

export const apiGet = <T>(endpoint: string) =>
    request<T>(() => axiosInstance.get(endpoint));

export const apiPost = <T>(endpoint: string, data?: unknown) =>
    request<T>(() => axiosInstance.post(endpoint, data));

export const apiPut = <T>(endpoint: string, data?: unknown) =>
    request<T>(() => axiosInstance.put(endpoint, data));

export const apiPatch = <T>(endpoint: string, data?: unknown) =>
    request<T>(() => axiosInstance.patch(endpoint, data));

export const apiDelete = <T>(endpoint: string) =>
    request<T>(() => axiosInstance.delete(endpoint));

export function setAuthCookie(token: string) {
    if (typeof document === 'undefined') return;
    const secure = window.location.protocol === 'https:' ? '; secure' : '';
    document.cookie = `token=${encodeURIComponent(token)}; path=/; max-age=604800; samesite=lax${secure}`;
}
