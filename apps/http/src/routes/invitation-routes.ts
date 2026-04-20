import { Router } from "express";
import type { Router as ExpressRouter } from "express";
import { protect } from "../middleware/admin-middleware";
import { inviteAccept, inviteAdmin, requestInvitation } from "../controller/invitation-controller.js";
const router: ExpressRouter = Router();

router.post("/accept/:invitationToken", inviteAccept);
router.post("/request-invitation", requestInvitation);

router.use(protect); // Middleware to protect routes below - user must be authenticated

// Protected routes (require authentication - admin must be logged in)
router.post('/invite', inviteAdmin);

export default router;