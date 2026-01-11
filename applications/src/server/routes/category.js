import { Router } from "express";
import { CategoryController } from "../controllers/categories.controller.js";
import { authMiddleware, adminMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/categories", CategoryController.getCategories);
router.get("/categories/:id", CategoryController.getCategoryById);
router.post("/categories", CategoryController.createCategory);
router.put("/categories/:id", CategoryController.updateCategory);
router.delete("/categories/:id", CategoryController.deleteCategory);

export default router;