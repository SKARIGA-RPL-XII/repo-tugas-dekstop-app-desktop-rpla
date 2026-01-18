import { z } from "zod";

export const createUserSchema = z.object({
  username: z.string().min(3, "username minimal 3 karakter"),
  name: z.string().min(3, "name minimal 3 karakter"),
  email: z.string().email("email tidak valid"),
  password: z.string().min(6, "password minimal 6 karakter"),
  role: z.enum(["admin", "cashier"]),
});

export const updateUserSchema = z.object({
  username: z.string().min(3).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  role: z.enum(["admin", "cashier"]),
});
