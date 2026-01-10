import { Router } from "express";
import { categoryController } from "../controllers/categories.controller.js";

const router = Router();

router.get("/filterCategories", categoryController.filterCategories);
router.get("/getAllCategories", categoryController.getCategories);
router.post("/createCategories", categoryController.createCategory);
router.get("/getCategoryById/:id", categoryController.getCategoryById);
router.put("/updateCategories/:id", categoryController.updateCategory);
router.delete("/delete/:id", categoryController.deleteCategory);

export default router;