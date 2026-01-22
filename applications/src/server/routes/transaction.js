import { Router } from "express";
import {
  authMiddleware,
  cashierMiddleware,
} from "../middlewares/auth.middleware.js";
import { TransactionsController } from "../controllers/transaction.controller.js";

const router = Router();

router.post(
  "/transaction/create",
  authMiddleware,
  cashierMiddleware,
  TransactionsController.createTransaction,
);

router.get(
  "/transaction/:transaction_id",
  authMiddleware,
  cashierMiddleware,
  TransactionsController.getTransaction,
);
router.get(
  "/transaction/",
  authMiddleware,
  cashierMiddleware,
  TransactionsController.getTransaction,
);

export default router;
