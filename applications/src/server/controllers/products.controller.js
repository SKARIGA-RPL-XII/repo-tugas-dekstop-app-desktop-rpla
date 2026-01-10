import { errorResponse, successResponse } from "../utils/response.js";
import { Products } from "../model/products.model.js";
import { supabase } from "../config/supabase.js";
import { formatFieldError } from "../utils/formatFieldError.js";

export class ProductsController {
  // Filter products by created_at, pagination, and search
  static async filterProducts(req, res) {
    try {
      const { created_at, page = 1, limit = 10, search = "" } = req.query;
      const params = {
        created_at,
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        search
      };
      const data = await Products.filterProducts(supabase, params);
      return successResponse(res, data, "Filtered products fetched successfully");
    } catch (e) {
      return errorResponse(res, e.message, 400);
    }
  }
  static async getProductById(req, res) {
    try {
      const data = await Products.findById(supabase, req.params.id);
      return successResponse(res, data, "success get user by id");
    } catch (e) {
      return errorResponse(res, e.message, 404);
    }
  }

  static async createProduct(req, res) {
    try {
      const {
        product_name,
        product_code,
        price,
        description,
        url_image,
        category_id,
        stock
      } = req.body;

      if (!product_name || !price || !category_id) {
        return errorResponse(
          res,
          "product_name, price, and category_id are required",
          400
        );
      }

      const payload = {
        product_name,
        product_code,
        price,
        description,
        url_image,
        category_id,
        stock
      };

      const data = await Products.create(supabase, payload);
      return successResponse(res, data, "Product created successfully");
    } catch (e) {
      return errorResponse(res, e.message, 400);
    }
  }


  static async updateProduct(req, res) {
    try {
      const id = req.params.id;

      const {
        product_name,
        product_code,
        price,
        description,
        url_image,
        category_id
      } = req.body;

      const payload = {
        product_name,
        product_code,
        price,
        description,
        url_image,
        category_id
      };

      Object.keys(payload).forEach(
        key => payload[key] === undefined && delete payload[key]
      );

      if (Object.keys(payload).length === 0) {
        return errorResponse(res, "No data to update", 400);
      }

      const data = await Products.update(supabase, id, payload);
      return successResponse(res, data, "Product updated successfully");
    } catch (e) {
      return errorResponse(res, e.message, 400);
    }
  }


  static async deleteProduct(req, res) {
    try {
      const id = req.params.id;
      await Products.delete(supabase, id);
      return successResponse(res, null, "Product deleted successfully");
    } catch (e) {
      return errorResponse(res, e.message, 400);
    }
  }

  static async getAllProducts(req, res) {
    try {
      const data = await Products.getAll(supabase);
      return successResponse(res, data, "success get all products");
    } catch (e) {
      return errorResponse(res, e.message, 400);
    }
  }
}
