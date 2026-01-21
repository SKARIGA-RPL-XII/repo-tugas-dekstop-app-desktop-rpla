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

  const finalParams: any = { ...params };

  if (finalParams.status === "active") {
    finalParams.is_blocked = false;
    delete finalParams.status;
  }

  if (finalParams.status === "blocked") {
    finalParams.is_blocked = true;
    delete finalParams.status;
  }

  if (finalParams.start_date) {
    finalParams.start_date = `${finalParams.start_date}T00:00:00.000Z`;
  }

  if (finalParams.end_date) {
    finalParams.end_date = `${finalParams.end_date}T23:59:59.999Z`;
  }

  if (finalParams.page) {
    finalParams.page = Number(finalParams.page);
  }

  if (finalParams.limit) {
    finalParams.limit = Number(finalParams.limit);
  }

  const response = await ApiClient.get("/users", {
    params: finalParams,
  });

  return {
    data: response.data.data,
    meta: response.data.meta,
  };
}

  static async getUserById(id: string) {
    const res = await ApiClient.get(`/user/${id}`);
    return res.data.data;
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
