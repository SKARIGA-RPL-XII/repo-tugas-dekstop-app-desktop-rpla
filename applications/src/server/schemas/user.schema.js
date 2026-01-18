import { z } from "zod";

export const createUserSchema = z.object({
  username: z.string().min(3, "username minimal 3 karakter"),
  email: z.string().email("email tidak valid"),
  password: z.string().min(6, "password minimal 6 karakter"),
  role: z.enum(["admin", "cashier"]),
  is_blocked: z.enum([true , false]),
});

export const updateUserSchema = z.object({
  username: z.string().min(3).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  role: z.enum(["admin", "cashier"]).optional(),
  is_blocked: z.enum([true , false]).optional(),
});
