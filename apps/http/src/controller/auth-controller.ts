import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { client } from '@repo/db';
import { catchAsync } from '../utils/catch-async';
import { AuthRequest } from '../config/auth-request-config.js';
import { Response } from 'express';
import { EmailChangeSchema, GoogleLoginSchema, LoginUserSchema, PasswordChangeSchema, RegisterUserSchema } from '../types';
import { google_oauth_client } from '../utils/google-oauth-client';
import { generateToken } from '../utils/generate-token';

// Register new user
export const register = catchAsync(
    async (req: AuthRequest, res: Response) => {

        try {
            const { data, success } = RegisterUserSchema.safeParse(req.body);

            if (!success) {
                return res.status(400).json({ success: false, message: 'Invalid input data' });
            }

            const { email, name, password } = data;

            // Interests are optional - they'll be saved after user creation if provided

            // Check if email already exists
            const existingUser = await client.user.findUnique({
                where: { email: email.toLowerCase() }
            });

            if (existingUser) {
                return res.status(409).json({
                    success: false,
                    message: 'Email already registered'
                });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Generate verification token
            const verificationToken = crypto.randomBytes(32).toString('hex');

            // Create user
            const user = await client.user.create({
                data: {
                    name: name,
                    email: email.toLowerCase(),
                    password: hashedPassword,
                }
            });

            // Send verification email in background so registration is not blocked by SMTP latency
            // sendVerificationEmail({ email: user.email, token: verificationToken, userId: user.id }).catch((emailError: any) => {
            //     console.error('Background verification email error:', emailError);
            // });

            // Generate JWT
            const token = generateToken(user.id);
            const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

            await client.session.create({
                data: {
                    userId: user.id,
                    token,
                    expiresAt,
                    ipAddress: req.ip ?? req.socket.remoteAddress,
                    userAgent: req.headers['user-agent'],
                }
            });

            // Set token as HTTP-only cookie
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            });

            res.status(201).json({
                success: true,
                message: 'Registration successful. Please verify your email.',
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
            });
        } catch (error) {
            console.error('Registration error:', error);
            res.status(500).json({
                success: false,
                message: 'Server error during registration'
            });
        }
    }
);

// Login user
export const login = catchAsync(
    async (req: AuthRequest, res: Response) => {

        try {
            const { data, success } = LoginUserSchema.safeParse(req.body);

            if (!success) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid input data'
                });
            }

            const { email, password } = data;

            // Validation
            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Email and password are required'
                });
            }

            // Find user
            const user = await client.user.findUnique({
                where: { email: email.toLowerCase() }
            });

            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid credentials'
                });
            }

            // Verify password
            const isPasswordValid = await bcrypt.compare(password, user?.password ?? "");

            if (!isPasswordValid) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid credentials'
                });
            }

            // Generate JWT
            const token = generateToken(user.id);
            const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

            await client.session.create({
                data: {
                    userId: user.id,
                    token,
                    expiresAt,
                    ipAddress: req.ip ?? req.socket.remoteAddress,
                    userAgent: req.headers['user-agent'],
                }
            });

            // Set token as HTTP-only cookie
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            });

            res.status(200).json({
                success: true,
                message: 'Login successful',
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    emailVerified: user.emailVerified
                }
            });
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({
                success: false,
                message: 'Server error during login'
            });
        }
    }
);

// Google OAuth login
export const googleLogin = catchAsync(
    async (req: AuthRequest, res: Response) => {

        try {
            const { data, success } = GoogleLoginSchema.safeParse(req.body);

            if (!success) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid Google token'
                });
            }

            const { googleToken } = data;

            // Verify Google token
            const ticket = await google_oauth_client.verifyIdToken({
                idToken: googleToken,
                audience: process.env.GOOGLE_CLIENT_ID
            });

            const payload = ticket.getPayload();
            const { email, name, picture, sub: googleId } = payload!;

            // Find or create user
            let user = await client.user.findUnique({
                where: { email: email?.toLowerCase() }
            });

            if (!user) {
                // Create new user if doesn't exist
                user = await client.user.create({
                    data: {
                        name: name ?? "",
                        email: email?.toLowerCase() ?? "",
                        password: await bcrypt.hash(crypto.randomBytes(16).toString('hex'), 10), // Random password
                        image: picture,
                        emailVerified: true, // Google emails are already verified
                    }
                });
            } else if (!user.emailVerified) {
                // If user exists but is not verified, mark as verified
                user = await client.user.update({
                    where: { id: user.id },
                    data: { emailVerified: true }
                });
            }

            // Generate JWT
            const token = generateToken(user.id);
            const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

            await client.session.create({
                data: {
                    userId: user.id,
                    token,
                    expiresAt,
                    ipAddress: req.ip ?? req.socket.remoteAddress,
                    userAgent: req.headers['user-agent'],
                }
            });

            // Set token as HTTP-only cookie
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            });

            res.status(200).json({
                success: true,
                message: 'Google login successful',
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    emailVerified: user.emailVerified
                }
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: 'Server error during Google login',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    }
);

// ==================== PROTECTED ROUTES ====================

// Logout user
export const logout = catchAsync(
    async (req: AuthRequest, res: Response) => {
        try {
            const token = req.headers.authorization?.split(' ')[1] ?? req.cookies?.token;

            if (token) {
                await client.session.deleteMany({ where: { token } });
            }

            // Clear the token cookie
            res.clearCookie('token', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                path: '/'
            });

            res.status(200).json({ success: true, message: 'Logout successful' });
        } catch (error) {
            console.error('Logout error:', error);
            res.status(500).json({ success: false, message: 'Server error during logout' });
        }
    }
);

// Get user profile
export const getProfile = catchAsync(
    async (req: AuthRequest, res: Response) => {

        try {
            const user = await client.user.findUnique({
                where: { id: req.userId },
                select: {
                    id: true,
                    name: true,
                    emailVerified: true,
                    image: true,
                    role: true,
                    createdAt: true,
                }
            });

            if (!user) {
                // User doesn't exist in database - clear the token with same options
                res.clearCookie('token', {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                    path: '/'
                });
                return res.status(401).json({
                    success: false,
                    message: 'User not found. Please log in again.'
                });
            }

            res.status(200).json({ success: true, user });
        } catch (error) {
            console.error('Get profile error:', error);
            res.status(500).json({ success: false, message: 'Server error while fetching profile' });
        }
    }
);

// Change email
export const changeEmail = catchAsync(
    async (req: AuthRequest, res: Response) => {

        try {
            const { data, success } = EmailChangeSchema.safeParse(req.body);

            if (!success) {
                return res.status(400).json({ success: false, message: 'Invalid input data' });
            }

            const { newEmail } = data;

            const existingUser = await client.user.findUnique({
                where: { email: newEmail.toLowerCase() }
            });

            if (existingUser) {
                return res.status(409).json({ success: false, message: 'Email already in use' });
            }

            const verificationToken = crypto.randomBytes(32).toString('hex');

            await client.user.update({
                where: { id: req.user.id },
                data: { email: newEmail.toLowerCase(), emailVerified: false }
            });

            // await sendVerificationEmail({ email: newEmail, token: verificationToken, userId: req?.userId! });

            res.status(200).json({ success: true, message: 'Verification email sent to new address' });
        } catch (error) {
            console.error('Change email error:', error);
            res.status(500).json({ success: false, message: 'Server error while changing email' });
        }
    }
);

// Delete profile
export const deleteProfile = catchAsync(
    async (req: AuthRequest, res: Response) => {
        try {
            const { password } = req.body;

            if (!password) {
                return res.status(400).json({ success: false, message: 'Password confirmation is required' });
            }

            const user = await client.user.findUnique({
                where: { id: req.user.id }
            });

            const isPasswordValid = await bcrypt.compare(password, user?.password || '');

            if (!isPasswordValid) {
                return res.status(401).json({ success: false, message: 'Invalid password' });
            }

            // TODO: We will not actually delete the user record to preserve data integrity of related records (like vault items) - instead we will mark the user as deleted and filter them out in queries. This is just a placeholder for now.
            await client.user.delete({
                where: { id: req.user.id }
            });

            res.status(200).json({ success: true, message: 'Account deleted successfully' });
        } catch (error) {
            console.error('Delete profile error:', error);
            res.status(500).json({ success: false, message: 'Server error while deleting account' });
        }
    }
);

// Change password
export const changePassword = catchAsync(
    async (req: AuthRequest, res: Response) => {

        try {
            const { data, success } = PasswordChangeSchema.safeParse(req.body);

            if (!success) {
                return res.status(400).json({ success: false, message: 'Invalid input data' });
            };

            const { currentPassword, newPassword } = data;

            if (!currentPassword || !newPassword) {
                return res.status(400).json({ success: false, message: 'Current and new password are required' });
            }

            if (newPassword.length < 6) {
                return res.status(400).json({ success: false, message: 'New password must be at least 6 characters' });
            }

            const user = await client.user.findUnique({
                where: { id: req.user.id }
            });

            const isPasswordValid = await bcrypt.compare(currentPassword, user?.password || '');

            if (!isPasswordValid) {
                return res.status(401).json({ success: false, message: 'Current password is incorrect' });
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);

            await client.user.update({
                where: { id: req.user.id },
                data: { password: hashedPassword }
            });

            res.status(200).json({ success: true, message: 'Password changed successfully' });
        } catch (error) {
            console.error('Change password error:', error);
            res.status(500).json({ success: false, message: 'Server error while changing password' });
        }
    }
);