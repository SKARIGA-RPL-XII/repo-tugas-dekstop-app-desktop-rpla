import { Router } from "express";
import { categoryController } from "../controllers/categories.controller.js";

const router = Router();

router.get("/", (req, res) => {
    res.send("Category route: /");
});

router.get("/getAllCategories", async (req, res) => {
    try {
        categoryController.getCategories(req, res);
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

router.post("/createCategories", categoryController.createCategory);
router.get("/getCategoryById/:id", categoryController.getCategoryById);
router.put("/updateCategories/:id", categoryController.updateCategory);
router.delete("/delete/:id", categoryController.deleteCategory);

export default router;