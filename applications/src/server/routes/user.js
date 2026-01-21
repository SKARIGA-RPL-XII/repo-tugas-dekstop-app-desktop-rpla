import { Router } from "express";
import { UsersController } from "../controllers/users.controller.js";
import { authMiddleware, adminMiddleware } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/upload.js";


const router = Router();

router.get("/users", authMiddleware, adminMiddleware,UsersController.getUsers);
router.get("/user/:id", authMiddleware,adminMiddleware, UsersController.getUserById);
router.post("/users", authMiddleware,adminMiddleware, UsersController.createUser);
router.put("/user/:id", authMiddleware, UsersController.updateUser);
router.put("/user/:id",authMiddleware,adminMiddleware,upload.single("avatar"),UsersController.updateUser);
router.delete("/user/:id", authMiddleware, adminMiddleware, UsersController.deleteUser);

export default router;
