import axios from 'axios';
import type {
    AuthResponse,
    LoginPayload,
    RegisterPayload,
    GoogleLoginPayload,
    ProfileResponse,
} from '@/types/auth';

const authAxios = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE}/api/v1`,
    withCredentials: true,
});

authAxios.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const loginApi = (payload: LoginPayload) =>
    authAxios.post<AuthResponse>('/admin/login', payload).then((r) => r.data);

export const registerApi = (payload: RegisterPayload) =>
    authAxios.post<AuthResponse>('/admin/register', payload).then((r) => r.data);

export const googleLoginApi = (payload: GoogleLoginPayload) =>
    authAxios.post<AuthResponse>('/admin/google-login', payload).then((r) => r.data);

export const logoutApi = () =>
    authAxios.post<{ success: boolean; message: string }>('/admin/logout').then((r) => r.data);

export const getProfileApi = () =>
    authAxios.get<ProfileResponse>('/admin/profile').then((r) => r.data);
