import { errorResponse, successResponse } from "../utils/response.js";
import {
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../model/Categories.js";

export class categoryController {
  static async getCategories(req, res) {
    try {
      const data = await getAllCategories();
      return successResponse(res, data, "Categories retrieved successfully");
    } catch (error) {
      return errorResponse(
        res,
        "Failed to retrieve products",
        500,
        error.message
      );
    }
  }

  static async getCategoryById(req, res) {
    const { id } = req.params;
    try {
      const category = await getCategoryById(id);
      if (!category) {
        return errorResponse(res, "Category not found", 404);
      }
      return successResponse(res, category, "Category retrieved successfully");
    } catch (error) {
      return errorResponse(
        res,
        "Failed to retrieve category",
        500,
        error.message
      );
    }
    F;
  }

  static async createCategory(req, res) {
    const { name, category, price, stock } = req.body;
    const newCategory = {
      id: data.length + 1,
      name,
      category,
      price,
      stock,
    };
    data.push(newCategory);
    return successResponse(res, newCategory, "Category created successfully");
  }

  static async updateCategory(req, res) {
    const { id } = req.params;
    try {
      const { category_name } = req.body;

      if (!category_name) {
        return errorResponse(res, "Category name is required", 400);
      }

      const dataUpdate = {
        category_name: category_name,
        updated_at: new Date().toISOString(),
      };

      const result = await updateCategory(id, dataUpdate);

      if (result.error) {
        return errorResponse(
          res,
          "Failed to update category in DB",
          500,
          result.error.message
        );
      }

      if (!result.data) {
        return errorResponse(res, `Category with ID ${id} not found`, 404);
      }

      return successResponse(
        res,
        result.data,
        "Category updated successfully"
      );
    } catch (error) {
      return errorResponse(
        res,
        "Internal Server Error during update",
        500,
        error.message
      );
    }
  }

  static async deleteCategory(req, res) {
    const { id } = req.params;
    try {
      const result = await deleteCategory(id);
      if (result.error) {
        return errorResponse(
          res,
          "Failed to delete category in DB",
          500,
          result.error.message
        );
      }
      return successResponse(res, null, result.message);
    } catch (error) {
      return errorResponse(
        res,
        "Internal Server Error during deletion",
        500,
        error.message
      );
    }
  }
}
