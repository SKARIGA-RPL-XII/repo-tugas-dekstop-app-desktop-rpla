import { Category, GetCategoriesParams } from "../types/category";
import ApiClient from "../utils/apiClient";

export class CategoryServices {
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

  static async getCategoryById(id: number): Promise<Category> {
    const response = await ApiClient.get(`/categories/${id}`);
    return response.data;
  }

  static async createCategory(payload: Category): Promise<Category> {
    const response = await ApiClient.post("/categories", payload);
    return response.data;
  }

  static async updateCategory(
    id: number,
    payload: Partial<Category>
  ): Promise<Category> {
    const response = await ApiClient.put(`/categories/${id}`, payload);
    return response.data;
  }

  static async deleteCategory(id: number): Promise<void> {
    await ApiClient.delete(`/categories/${id}`);
  }
}
