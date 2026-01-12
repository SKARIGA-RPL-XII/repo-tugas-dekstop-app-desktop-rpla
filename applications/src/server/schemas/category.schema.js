import { z } from "zod";

export const CategorySchema = z.object({
  category_name: z
    .string()
    .min(3, "Category name is required")
    .max(100, "Category name is too long"),
});

/**
 * @typedef {{ category_name: string }} CategoryInput
 */
