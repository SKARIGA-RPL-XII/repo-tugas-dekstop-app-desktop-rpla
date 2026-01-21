import { Product, GetProductsParams } from "../types/product";
import { Category, GetCategoriesParams } from "../types/category";
import ApiClient from "../utils/apiClient";

export class ProductServices {
  static async getProducts(
    params?: GetProductsParams & {
      sortBy?: string;
      sortOrder?: "asc" | "desc";
    }
  ): Promise<{
    data: Product[];
    meta: { page: number; limit: number; count: number };
  }> {
    const response = await ApiClient.get("/products", { params });
    return {
      data: response.data.data.data,
      meta: response.data.meta,
    };
  }

  static async getProductById(id: string): Promise<Product> {
    const response = await ApiClient.get(`/product/${id}`);
    return response.data.data;
  }

  // ✅ INI SUDAH BENAR
  static async createProduct(payload: FormData) {
    return ApiClient.post("/product", payload);
  }

  static async updateProduct(
    id: string,
    payload: Partial<Product>
  ): Promise<Product> {
    const response = await ApiClient.put(`/product/${id}`, payload);
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
