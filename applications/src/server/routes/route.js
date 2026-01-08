import { Router } from "express";
import { authRoute } from "./auth.js";
import { productRoute } from "./product.js";
import categoryRoute from "./category.js";

const router = Router();

router.use("/auth", authRoute);
router.use("/product", productRoute);
router.use("/category", categoryRoute);

export { router as route };