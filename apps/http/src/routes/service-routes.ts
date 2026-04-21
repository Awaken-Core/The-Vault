import { Router } from "express";
import type { Router as ExpressRouter } from "express";
import { protect as adminProtect } from "../middleware/admin-middleware";
import {
    getAllServices,
    getServiceById,
    createService,
    updateService,
    deleteService,
} from "../controller/service-controller";

const router: ExpressRouter = Router();

router.get("/", getAllServices);
router.get("/:id", getServiceById);
router.post("/", adminProtect, createService);
router.patch("/:id", adminProtect, updateService);
router.delete("/:id", adminProtect, deleteService);

export default router;

