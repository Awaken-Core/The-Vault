import { Router } from "express";
import type { Router as ExpressRouter } from "express";
import { protect } from "../middleware/admin-middleware";
// import { changeEmail, changePassword, deleteProfile, getProfile, googleLogin, login, logout, register } from "../controller/auth-controller";
// import { changeEmail, changePassword, deleteProfile, getProfile, googleLogin, login, logout, register } from "../controller/admin-auth-controller";
import { BanUser, GetAllMembers } from "../controller/admin-auth-controller";
const router: ExpressRouter = Router();

// Public routes (no authentication required)
// router.post('/register', register);
// router.post('/login', login);
// router.post('/google-login', googleLogin);

// TODO: Add email verification route (e.g., /verify-email) and resend verification email route (e.g., /resend-verification-email)

// TODO: Add password reset & forgot password routes

router.use(protect); // Middleware to protect routes below - user must be authenticated

// Protected routes (require authentication - admin must be logged in)
router.post('/block-user/:userId', BanUser); // this route can block or unblock a user based on their current status (if blocked, it will unblock; if unblocked, it will block);
router.get('/all/members', GetAllMembers);

// router.post('/logout', logout);
// router.get('/profile', getProfile);
// router.patch('/account/email', changeEmail);
// router.delete('/profile', deleteProfile);
// router.post('/change-password', changePassword);

export default router;