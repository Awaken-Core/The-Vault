import type {
    AuthResponse,
    LoginPayload,
    RegisterPayload,
    GoogleLoginPayload,
    ProfileResponse,
} from '@/types/auth';

import authAxios from './axios';

export const loginApi = (payload: LoginPayload) =>
    authAxios.post<AuthResponse>('/auth/login', payload).then((r) => r.data);

export const registerApi = (payload: RegisterPayload) =>
    authAxios.post<AuthResponse>('/auth/register', payload).then((r) => r.data);

export const googleLoginApi = (payload: GoogleLoginPayload) =>
    authAxios.post<AuthResponse>('/auth/google-login', payload).then((r) => r.data);

export const logoutApi = () =>
    authAxios.post<{ success: boolean; message: string }>('/auth/logout').then((r) => r.data);

export const getProfileApi = () =>
    authAxios.get<ProfileResponse>('/auth/profile').then((r) => r.data);
