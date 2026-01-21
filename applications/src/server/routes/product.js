import { Router } from "express";
import { ProductsController } from "../controllers/products.controller.js";
import { authMiddleware, adminMiddleware } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/upload.js";

const router = Router();

router.get("/products", authMiddleware, adminMiddleware, ProductsController.filterProducts);
// router.get("/product", authMiddleware, adminMiddleware, ProductsController.getProducts);
router.get("/product/:id", authMiddleware, adminMiddleware, ProductsController.getProducts);
router.post("/product",authMiddleware,adminMiddleware,upload.single("image"), ProductsController.createProduct);
router.put(
  "/product/:id",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  ProductsController.updateProduct
);
router.delete("/delete/:id", authMiddleware, adminMiddleware, ProductsController.deleteProduct);

export default router;
