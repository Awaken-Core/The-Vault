import { Router } from "express";
import type { Router as ExpressRouter } from "express";
import { protect as userProtect } from "../middleware/auth-middleware";
import { protect as adminProtect } from "../middleware/admin-middleware";
import {
    createProductPurchase,
    getMyProductPurchases,
    getAllProductPurchases,
    getProductPurchaseById,
    updateProductPurchaseStatus,
    createServicePurchase,
    getMyServicePurchases,
    getAllServicePurchases,
    getServicePurchaseById,
    updateServicePurchaseStatus,
    getServicePurchaseInstallments,
    addServicePurchaseInstallment,
    updateInstallmentStatus,
} from "../controller/purchase-controller";

const router: ExpressRouter = Router();

// ── Product purchases (one-time) ──────────────────────────────
router.post("/products", userProtect, createProductPurchase);
router.get("/products/my", userProtect, getMyProductPurchases);
router.get("/products/all", adminProtect, getAllProductPurchases);
router.get("/products/:id", userProtect, getProductPurchaseById);
router.patch("/products/:id/status", adminProtect, updateProductPurchaseStatus);

// ── Service purchases (installments supported) ────────────────
router.post("/services", userProtect, createServicePurchase);
router.get("/services/my", userProtect, getMyServicePurchases);
router.get("/services/all", adminProtect, getAllServicePurchases);
router.get("/services/:id", userProtect, getServicePurchaseById);
router.patch("/services/:id/status", adminProtect, updateServicePurchaseStatus);

// Installments
router.get("/services/:servicePurchaseId/installments", userProtect, getServicePurchaseInstallments);
router.post("/services/:servicePurchaseId/installments", adminProtect, addServicePurchaseInstallment);
router.patch("/services/installments/:installmentId/status", adminProtect, updateInstallmentStatus);

export default router;

