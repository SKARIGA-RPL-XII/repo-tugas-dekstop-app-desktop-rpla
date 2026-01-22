import { Router } from "express";
import {
    authMiddleware,
    cashierMiddleware
} from '../middlewares/auth.middleware.js';
import { DashboardController } from "../controllers/dashboard.controller.js";

const router = Router();

router.get("/dashboard",  DashboardController.getDashboard);

export default router;