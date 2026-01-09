import { Router } from "express";
import { ProductsController } from "../controllers/products.controller.js";

export const router = Router();
export const productRoute = () => {
  router.get("/products", (req, res) =>
    ProductsController.getProducts(req, res)
  );
};
