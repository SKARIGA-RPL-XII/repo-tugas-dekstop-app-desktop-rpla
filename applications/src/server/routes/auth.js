import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";

export const router = Router();
export const authRoute = () => {
  router.post("/login", (req, res) => AuthController.login(req, res));
  router.post("/logout", (req, res) => AuthController.logout(req, res));
};
