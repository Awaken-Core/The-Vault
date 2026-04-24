"use client";

import { useState } from 'react';
import { cn } from "@/lib/utils";
import { Button, Input, Label, Separator, FieldGroup, Field, FieldError, FieldSeparator } from "@repo/ui";
import { GoogleLogin } from '@react-oauth/google';
import { apiPost, ApiError, setAuthCookie } from '@/lib/api';
import type { AuthResponse } from '@/types/auth';
import Link from 'next/link';

type FormErrors = { email?: string; password?: string };

export function LoginForm({ className, ...props }: React.ComponentProps<"form">) {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState(false);

    const validate = (): boolean => {
        const next: FormErrors = {};
        if (!formData.email) next.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) next.email = 'Invalid email address';
        if (!formData.password) next.password = 'Password is required';
        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const persist = (token: string, user: AuthResponse['user']) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
        }
        setAuthCookie(token);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setIsLoading(true);
        setErrors({});
        try {
            const res = await apiPost<AuthResponse>('/admin/login', formData);
            if (!res.token) throw new Error('Token missing in response');
            persist(res.token, res.user);
            window.location.href = '/';
        } catch (error) {
            setErrors({
                email: error instanceof ApiError ? error.message : 'Invalid credentials. Please try again.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSuccess = async (credential: string) => {
        setIsLoading(true);
        setErrors({});
        try {
            const res = await apiPost<AuthResponse>('/admin/google-login', { googleToken: credential });
            if (!res.token) throw new Error('Token missing in response');
            persist(res.token, res.user);
            window.location.href = '/';
        } catch (error) {
            setErrors({
                email: error instanceof ApiError ? error.message : 'Google login failed. Please try again.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form
            className={cn("flex flex-col gap-6", className)}
            onSubmit={handleSubmit}
            {...props}
        >
            <FieldGroup>
                <div className="flex flex-col items-center gap-1 text-center">
                    <h1 className="text-[20px] tracking-[-0.2px] font-bold font-sans">Login to your account</h1>
                    <p className="text-sm text-balance text-muted-foreground">
                        Enter your email and password to login
                    </p>
                </div>
                <Separator className="bg-white/20" />

                <Field>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={isLoading}
                        autoFocus
                    />
                    {errors.email && (
                        <FieldError errors={[{ message: errors.email }]} />
                    )}
                </Field>

                <Field>
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        disabled={isLoading}
                    />
                    {errors.password && (
                        <FieldError errors={[{ message: errors.password }]} />
                    )}
                </Field>

                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Signing in...' : 'Sign in'}
                </Button>

                <FieldSeparator>or</FieldSeparator>

                <div className="flex justify-center">
                    <GoogleLogin
                        onSuccess={(res) => {
                            if (res.credential) handleGoogleSuccess(res.credential);
                        }}
                        onError={() => setErrors({ email: 'Google login failed' })}
                        theme="filled_black"
                        size="large"
                        text="continue_with"
                        shape="pill"
                    />
                </div>

                <p className="text-center text-sm text-muted-foreground">
                    Don&apos;t have an account?{' '}
                    <Link href="/sign-up" className="text-foreground underline underline-offset-4 hover:text-primary">
                        Sign up
                    </Link>
                </p>
            </FieldGroup>
        </form>
    );
}
