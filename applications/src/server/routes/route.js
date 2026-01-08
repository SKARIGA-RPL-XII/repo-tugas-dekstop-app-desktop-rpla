import { Router } from "express";
import { authRoute } from "./auth.js";
import { productRoute } from "./product.js";

const router = Router();

router.use("/auth", authRoute);
router.use("/product", productRoute);

export { router as route };
