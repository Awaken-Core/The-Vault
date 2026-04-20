import { Router } from "express";
import type { Router as ExpressRouter } from "express";
import { protect } from "../middleware/admin-middleware";
import { getAllQuotations } from "../controller/quotation-controllers";
const router: ExpressRouter = Router();

router.use(protect); // Middleware to protect routes below - user must be authenticated

// Protected routes (require authentication - admin must be logged in)
router.get('/all', getAllQuotations);

export default router;