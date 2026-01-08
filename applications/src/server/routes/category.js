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

router.post("/createCategory", async (req, res) => {
    try {
        categoryController.createCatgeory(req, res);
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        categoryController.getCategoryById(req, res);
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

router.put("update/:id", categoryController.updateCategory);

router.delete("/delete/:id", categoryController.deleteCategory);

export default router;