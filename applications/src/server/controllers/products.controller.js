import { errorResponse, successResponse } from "../utils/response.js";
import { Products } from "../model/products.model.js";
import { supabase } from "../config/supabase.js";
import { formatFieldError } from "../utils/formatFieldError.js";

function generateNextProductCode(lastCode) {
  if (!lastCode) return "PROD-0001";

  const number = parseInt(lastCode.replace("PROD-", ""), 10);
  const nextNumber = number + 1;

  return `PROD-${String(nextNumber).padStart(4, "0")}`;
}


export class ProductsController {

 static async filterProducts(req, res) {
  try {
    const {
      page = 1,
      limit = 10,
      ...filters
    } = req.query;

    const params = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      ...filters,
    };

    const result = await Products.filterProducts(supabase, params);

    return successResponse(
      res,
      result.data,
      "Filtered products fetched successfully",
      200,
      {
        page: result.page,
        limit: result.limit,
        count: result.count,
      }
    );
  } catch (e) {
    return errorResponse(res, e.message, 400);
  }
}

  // static async getProductById(req, res) {
  //   try {
  //     const data = await Products.findById(supabase, req.params.id);
  //     return successResponse(res, data, "success get user by id");
  //   } catch (e) {
  //     return errorResponse(res, e.message, 404);
  //   }
  // }
  
  static async createProduct(req, res) {
    try {
      const {
        product_name,
        price,
        description,
        category_id,
        stock,
        is_active 
      } = req.body;

      if (!product_name || !price || !category_id) {
        return errorResponse(
          res,
          "product_name, price, and category_id are required",
          400
        );
      }

      if (!req.file) {
        return errorResponse(res, "Image is required", 400);
      }

      const lastCode = await Products.getLastProductCode(supabase);
      const product_code = generateNextProductCode(lastCode);

      const fileExt = req.file.originalname.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { error } = await supabase.storage
        .from("product_image")
        .upload(filePath, req.file.buffer, {
          contentType: req.file.mimetype,
          upsert: false
        });

      if (error) return errorResponse(res, error.message, 400);

      const { data: publicUrl } = supabase.storage
        .from("product_image")
        .getPublicUrl(filePath);

      const payload = {
        product_name,
        product_code,
        price,
        description,
        category_id,
        stock,
        is_active: is_active === "true" || is_active === true, // 🔥 KUNCI
        url_image: publicUrl.publicUrl
      };

      const data = await Products.create(supabase, payload);
      return successResponse(res, data, "Product created successfully");
    } catch (e) {
      return errorResponse(res, e.message, 400);
    }
  }

  static async updateProduct(req, res) {
    try {
      const { id } = req.params;

      const {
        product_name,
        product_code,
        price,
        description,
        category_id,
        is_active,
        stock
      } = req.body;

      const payload = {
        product_name,
        product_code,
        price,
        description,
        category_id,
        stock,
        is_active: is_active === "true" || is_active === true,
      };

      if (req.file) {
        const fileExt = req.file.originalname.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `products/${fileName}`;

        const { error } = await supabase.storage
          .from("product_image")
          .upload(filePath, req.file.buffer, {
            contentType: req.file.mimetype,
            upsert: false,
          });

        if (error) {
          return errorResponse(res, error.message, 400);
        }

        const { data: publicUrl } = supabase.storage
          .from("product_image")
          .getPublicUrl(filePath);

        payload.url_image = publicUrl.publicUrl;
      }

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
      const { id } = req.params;
      const product = await Products.findById(supabase, id);
      let filePath = null;
      if (product.url_image) {
        const parts = product.url_image.split("/product_image/");
        filePath = parts[1]; 
      }

      if (filePath) {
        const { error: storageError } = await supabase.storage
          .from("product_image")
          .remove([filePath]);

        if (storageError) {
          console.error("Storage delete error:", storageError.message);
        }
      }

      await Products.delete(supabase, id);

      return successResponse(res, null, "Product & image deleted successfully");
    } catch (e) {
      return errorResponse(res, e.message, 400);
    }
  }


  // static async getAllProducts(req, res) {
  //   try {
  //     const data = await Products.getAll(supabase);
  //     return successResponse(res, data, "success get all products");
  //   } catch (e) {
  //     return errorResponse(res, e.message, 400);
  //   }
  // }

  static async getProducts(req, res) {
    try {
      const { id } = req.params;

      let data;
      if (id) {
        data = await Products.findById(supabase, id);
      } else {
        data = await Products.getAll(supabase);
      }

      return successResponse(res, data, "success get products");
    } catch (e) {
      return errorResponse(res, e.message, 400);
    }
  }

}
