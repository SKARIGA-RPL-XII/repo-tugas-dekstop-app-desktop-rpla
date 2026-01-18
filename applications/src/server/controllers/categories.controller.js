import { errorResponse, successResponse } from "../utils/response.js";
import {
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  createCategory,
} from "../model/categories.model.js";
import { CategorySchema } from "../schemas/category.schema.js";
import { formatFieldError } from "../utils/formatFieldError.js";

export class CategoryController {
 static async getCategories(req, res) {
  try {
    const { created_at, page = 1, limit = 10, search = "" } = req.query;

    const params = {
      created_at,
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      search,
    };

    const result = await getAllCategories(params);

    return successResponse(
      res,
      result.data,
      "Categories retrieved successfully",
      200,
      {
        page: params.page,
        limit: params.limit,
        count: result.meta.count
      }
    );
  } catch (error) {
    return errorResponse(
      res,
      "Failed to retrieve categories",
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
    try {
      const validatedData = CategorySchema.parse(req.body);

      const newCategory = {
        category_name: validatedData.category_name,
        created_at: new Date().toISOString(),
        updated_at: null,
      };

      const createdCategory = await createCategory(newCategory);

      if (!createdCategory || createdCategory.success !== true) {
        return errorResponse(
          res,
          "Failed to create category",
          500,
          createdCategory?.error?.message
        );
      }

      return successResponse(
        res,
        createdCategory.data,
        createdCategory.message
      );
    } catch (error) {
      if (error.name === "ZodError") {
        return errorResponse(
          res,
          formatFieldError(error.message),
          400
        );
      }
      return errorResponse(
        res,
        "Internal Server Error during creation",
        500,
        formatFieldError(error.message)
      );
    }
  }

  static async updateCategory(req, res) {
    const { id } = req.params;
    try {
      const validatedData = CategorySchema.parse(req.body);

      const dataUpdate = {
        category_name: validatedData.category_name,
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

      return successResponse(res, result.data, "Category updated successfully");
    } catch (error) {
       if (error.name === "ZodError") {
        return errorResponse(
          res,
          formatFieldError(error.message),
          400
        );
      }
     return errorResponse(
        res,
        "Internal Server Error during creation",
        500,
        formatFieldError(error.message)
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
