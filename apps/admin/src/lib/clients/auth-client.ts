import type {
    AuthResponse,
    LoginPayload,
    RegisterPayload,
    GoogleLoginPayload,
    ProfileResponse,
} from '@/types/auth';

import axiosClient from '../axios';

export const loginApi = (payload: LoginPayload) =>
    axiosClient.post<AuthResponse>('/auth/login', payload).then((r) => r.data);

export const registerApi = (payload: RegisterPayload) =>
    axiosClient.post<AuthResponse>('/auth/register', payload).then((r) => r.data);

export const googleLoginApi = (payload: GoogleLoginPayload) =>
    axiosClient.post<AuthResponse>('/auth/google-login', payload).then((r) => r.data);

export const logoutApi = () =>
    axiosClient.post<{ success: boolean; message: string }>('/auth/logout').then((r) => r.data);

export const getProfileApi = () =>
    axiosClient.get<ProfileResponse>('/auth/profile').then((r) => r.data);
