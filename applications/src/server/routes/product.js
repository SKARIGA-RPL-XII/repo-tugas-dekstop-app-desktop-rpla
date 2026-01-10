import { Router } from "express";
import { ProductsController } from "../controllers/products.controller.js";
import { authMiddleware, adminMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/product/filter", authMiddleware, adminMiddleware, ProductsController.filterProducts);
router.get("/product", authMiddleware, adminMiddleware, ProductsController.getAllProducts);
router.get("/product/:id", authMiddleware, adminMiddleware, ProductsController.getProductById);
router.post("/product", authMiddleware, adminMiddleware, ProductsController.createProduct);
router.put("/product/:id", authMiddleware, adminMiddleware, ProductsController.updateProduct);
router.delete("/delete/:id", authMiddleware, adminMiddleware, ProductsController.deleteProduct);

export default router;
