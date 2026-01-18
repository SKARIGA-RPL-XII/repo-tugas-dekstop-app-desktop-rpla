import { User, GetUsersParams } from "../types/user";
import ApiClient from "../utils/apiClient";

export class UserServices {
  static async getUsers(
    params?: GetUsersParams & {
      sortBy?: string;
      sortOrder?: "asc" | "desc";
    }
  ): Promise<{
    data: User[];
    meta: { page: number; limit: number; count: number };
  }> {
    const response = await ApiClient.get("/users", { params });

    return {
      data: response.data.data,
      meta: response.data.meta,
    };
  }

  static async getUserById(id: string): Promise<User> {
    const response = await ApiClient.get(`/users/${id}`);
    return response.data.data;
  }

  static async createUser(payload: Partial<User>): Promise<User> {
    const response = await ApiClient.post("/users", payload);
    return response.data.data;
  }

  static async updateUser(
    id: string,
    payload: Partial<User>
  ): Promise<User> {
    const response = await ApiClient.put(`/user/${id}`, payload);
    return response.data.data;
  }

  static async deleteUser(id: string): Promise<void> {
    await ApiClient.delete(`/user/${id}`);
  }
}
