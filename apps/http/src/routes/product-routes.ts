import { Router } from "express";
import type { Router as ExpressRouter } from "express";
import { protect } from "../middleware/admin-middleware";
import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} from "../controller/product-controller";

const router: ExpressRouter = Router();

// Public routes
router.get("/", getAllProducts);
router.get("/:id", getProductById);

router.use(protect); // Admin-only below

router.post("/", createProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
