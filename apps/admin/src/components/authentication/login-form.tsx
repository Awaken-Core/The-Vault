"use client";

import { useState } from 'react';
import { cn } from "@/lib/utils";
import { Button, Input, Label, Separator, FieldGroup, Field, FieldError, FieldSeparator } from "@repo/ui";
import { GoogleLogin } from '@react-oauth/google';
import { useLogin, useGoogleLogin } from '@/hooks/use-auth';
import Link from 'next/link';

type FormErrors = { email?: string; password?: string };

export function LoginForm({ className, ...props }: React.ComponentProps<"form">) {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState<FormErrors>({});

    const login = useLogin();
    const googleLogin = useGoogleLogin();
    const isLoading = login.isPending || googleLogin.isPending;

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        login.mutate(formData);
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
                    {login.isPending ? 'Signing in...' : 'Sign in'}
                </Button>

                <FieldSeparator>or</FieldSeparator>

                <div className="flex justify-center">
                    <GoogleLogin
                        onSuccess={(res) => {
                            if (res.credential) googleLogin.mutate({ googleToken: res.credential });
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
};
