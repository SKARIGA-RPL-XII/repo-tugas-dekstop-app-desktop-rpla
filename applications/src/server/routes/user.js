import { Router } from "express";
import { usersControllers } from "../controllers/users.controller.js";
import { authMiddleware, adminMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/users", authMiddleware, adminMiddleware,usersControllers.getUsers);
router.get("/user/:id", authMiddleware,adminMiddleware, usersControllers.getUserById);
router.post("/users", authMiddleware,adminMiddleware, usersControllers.createUser);
router.put("/user/:id", authMiddleware, adminMiddleware, usersControllers.updateUser);
router.delete("/user/:id", authMiddleware, adminMiddleware, usersControllers.deleteUser);

export default router;
