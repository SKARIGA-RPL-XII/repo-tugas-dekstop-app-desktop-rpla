import { loginSchema } from "../schemas/auth.schema.js";
import { successResponse, errorResponse } from "../utils/response.js";
import { supabase } from "../config/supabase.js";
import { loginService } from "../services/loginService.js";
export class AuthController {
  static async login(req, res) {
    try {
      const validation = loginSchema.safeParse(req.body);
      if (!validation.success)
        return errorResponse(
          res,
          "Validation error",
          400,
          validation.error.flatten().fieldErrors
        );

      const { email, password } = validation.data;

      const { token, user } = await loginService(supabase, email, password);

      return successResponse(res, { token, user }, "login success");
    } catch (err) {
      console.log(err);
      return errorResponse(res, err.message, 401);
    }
  }

  static async logout(req, res) {
    return successResponse(res, null, "Logout berhasil");
  }
}
