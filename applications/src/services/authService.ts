import { LoginPayload, LoginResponse } from "../types/Auth";
import ApiClient from "../utils/apiClient";

export class AuthService {
  static async login(payload: LoginPayload): Promise<LoginResponse> {
    const response = await ApiClient.post("/auth/login", payload);
    return response.data.data;
  }

  static async logout(token: string): Promise<void> {
    await ApiClient.post(
      "/auth/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
}
