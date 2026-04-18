import { Router } from 'express';
import type { Router as ExpressRouter } from "express";
import { protect } from '../middleware/auth-middleware';
import { getCurrentUser, getUserProfile, updateProfile } from '../controller/user-controller';

const router: ExpressRouter = Router();

router.use(protect); // Apply authentication middleware to all routes below

// Protected routes - require authentication
router.get('/me', getCurrentUser);
router.get('/profile/:userId', getUserProfile);
router.put('/profile', updateProfile);

export default router;