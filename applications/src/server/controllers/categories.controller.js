import { errorResponse, successResponse } from "../utils/response.js";
import {
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  createCategory,
} from "../model/categories.model.js";

export class categoryController {
  static async filterCategories(req, res) {
    try {
      const { created_at, page = 1, limit = 10, search = "" } = req.query;
      const params = {
        created_at,
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        search
      };
      const result = await filterCategoriesModel(params);
      return successResponse(res, result, "Filtered categories fetched successfully");
    } catch (error) {
      return errorResponse(res, "Failed to filter categories", 500, error.message);
    }
  }

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
  }

  static async createCategory(req, res) {
    const { category_name } = req.body;

    if (!category_name) {
      return errorResponse(res, "Category name is required", 400);
    }

    const newCategory = {
      category_name: category_name,
      created_at: new Date().toISOString(),
      updated_at: null,
    };
    try {
      const createdCategory = await createCategory(newCategory);
      if (!createdCategory) {
        return errorResponse(res, "Failed to create category", 500);
      }

      if (createdCategory.success === true) {
        return successResponse(
          res,
          createdCategory.data,
          createdCategory.message,
        );
      }
    } catch (error) {
      return errorResponse(
        res,
        "Internal Server Error during creation",
        500,
        error.message
      );
    }
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
