import { Product, GetProductsParams } from "../types/product";
import { Category, GetCategoriesParams } from "../types/category";
import ApiClient from "../utils/apiClient";

export class ProductServices {
  static async getProducts(params?: GetProductsParams) {
    const response = await ApiClient.get("/products", { params });

    return {
      data: response.data.data ?? [],
      meta: response.data.meta ?? {
        page: params?.page ?? 1,
        limit: params?.limit ?? 10,
        count: 0,
      },
    };
  }  

  static async getProductById(id: string): Promise<Product> {
    const response = await ApiClient.get(`/product/${id}`);
    return response.data.data;
  }

  static async createProduct(payload: FormData) {
    return ApiClient.post("/product", payload);
  }

  static async updateProduct(
    id: string,
    payload: FormData
  ): Promise<Product> {

    await ApiClient.put(`/product/${id}`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const response = await ApiClient.get(`/product/${id}`);
    return response.data.data;
  }

  static async deleteProduct(id: string): Promise<void> {
    await ApiClient.delete(`/delete/${id}`);
  }

  static async getCategories(params?: GetCategoriesParams): Promise<{
    data: Category[];
    meta: { page: number; limit: number; count: number };
  }> {
    const response = await ApiClient.get("/categories", { params });
    return {
      data: response.data.data,
      meta: response.data.meta,
    };
  }
}
