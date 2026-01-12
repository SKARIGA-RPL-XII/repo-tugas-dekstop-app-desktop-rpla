import { Router } from "express";
import { categoryController } from "../controllers/categories.controller.js";
import { authMiddleware, adminMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/categories/filter", authMiddleware, adminMiddleware, categoryController.filterCategories);  
router.get("/categories", authMiddleware, adminMiddleware, categoryController.getCategories);
router.get("/categories/:id", authMiddleware, adminMiddleware, categoryController.getCategoryById);
router.post("/categories", authMiddleware, adminMiddleware, categoryController.createCategory);
router.put("/categories/:id", authMiddleware, adminMiddleware, categoryController.updateCategory);
router.delete("/categories/:id", authMiddleware, adminMiddleware, categoryController.deleteCategory);

export default router;