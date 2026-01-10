import { Router } from "express";
import productRoute from "./product.js";
import authRoute  from "./auth.js";
import userRoute from "./user.js";

import categoryRoute from "./category.js";

const router = Router();
router.use("/auth", authRoute);
router.use(userRoute);
router.use(productRoute);
router.use("/category", categoryRoute);

export { router as route };