import { Users } from "../model/users.model.js";
import { createUserSchema, updateUserSchema } from "../schemas/user.schema.js";
import { errorResponse, successResponse } from "../utils/response.js";
import { supabase } from "../config/supabase.js";
import { formatFieldError } from "../utils/formatFieldError.js";

export class usersControllers {
  static async getUsers(req, res) {
    try {
      const data = await Users.getAll(supabase , req.query);
      return successResponse(res, data, "Users retrieved");
    } catch (e) {
      return errorResponse(res, e.message);
    }
  }

  static async getUserById(req, res) {
    try {
      const data = await Users.findById(supabase, req.params.id);
      return successResponse(res, data, "success get user by id");
    } catch (e) {
      return errorResponse(res, e.message, 404);
    }
  }

  static async createUser(req, res) {
    try {
      const payload = createUserSchema.parse(req.body);
      const data = await Users.create(supabase, payload);
      return successResponse(res, data, "User created", 201);
    } catch (e) {
      return errorResponse(
        res,
        "Validation error",
        400,
       formatFieldError(e.message)
      );
    }
  }

  static async updateUser(req, res) {
    try {
      const payload = updateUserSchema.parse(req.body);
      const data = await Users.update(supabase, req.params.id, payload);
      return successResponse(res, data, "User succes updated");
    } catch (e) {
      return errorResponse(res, "Validation error", 400, e.errors ?? e.message);
    }
  }

  static async deleteUser(req, res) {
    try {
      await Users.delete(supabase, req.params.id);
      return successResponse(res, null, "User succes deleted");
    } catch (e) {
      return errorResponse(res, e.message);
    }
  }
}
