import { Users } from "../model/users.model.js";
import { createUserSchema, updateUserSchema } from "../schemas/user.schema.js";
import { errorResponse, successResponse } from "../utils/response.js";
import { supabase } from "../config/supabase.js";
import { formatFieldError } from "../utils/formatFieldError.js";

export class UsersController {
  static async getUsers(req, res) {
    try {
      const {
        data,
        count,
        page = 1,
        limit = 10,
      } = await Users.getAll(supabase, req.query);

      return successResponse(res, data, "Users retrieved successfully", 200, {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        count,
      });
    } catch (error) {
      return errorResponse(res, "Failed to retrieve users", 500, error.message);
    }
  }

  static async getUserById(req, res) {
    try {
      const user = await Users.findById(supabase, req.params.id);

      if (!user) {
        return errorResponse(res, "User not found", 404);
      }

      return successResponse(res, user, "User retrieved successfully");
    } catch (error) {
      return errorResponse(res, "Failed to retrieve user", 500, error.message);
    }
  }

  static async createUser(req, res) {
    try {
      const validation = createUserSchema.safeParse(req.body);
      if (!validation.success) {
        return errorResponse(
          res,
          "Validation error",
          400,
          validation.error.flatten().fieldErrors,
        );
      }

      const { email, password, username, role, is_blocked } = validation.data;

      const payload = {
        email: email,
        password: password,
        username: username,
        role: role,
        is_blocked: is_blocked,
      };

      const newUser = await Users.create(supabase, payload);

      return successResponse(res, newUser, "User created successfully", 201);
    } catch (error) {
      if (error.name === "ZodError") {
        return errorResponse(
          res,
          "Validation error",
          400,
          error.errors.map((e) => e.message).join(", "),
        );
      }
      return errorResponse(
        res,
        "Internal Server Error during creation",
        500,
        formatFieldError(error.message),
      );
    }
  }

  static async updateUser(req, res) {
    try {
      const validation = updateUserSchema.safeParse(req.body);
      if (!validation.success) {
        return errorResponse(
          res,
          "Validation error",
          400,
          validation.error.errors.map((e) => e.message).join(", "),
        );
      }

      const payload = validation.data;

      const updatedUser = await Users.update(supabase, req.params.id, payload);

      if (!updatedUser) {
        return errorResponse(
          res,
          `User with ID ${req.params.id} not found`,
          404,
        );
      }

      return successResponse(res, updatedUser, "User updated successfully");
    } catch (error) {
      if (error.name === "ZodError") {
        return errorResponse(
          res,
          "Validation error",
          400,
          error.errors.map((e) => e.message).join(", "),
        );
      }
      return errorResponse(
        res,
        "Internal Server Error during update",
        500,
        formatFieldError(error.message),
      );
    }
  }

  static async deleteUser(req, res) {
    try {
      const deleted = await Users.delete(supabase, req.params.id);

      if (!deleted) {
        return errorResponse(
          res,
          `User with ID ${req.params.id} not found`,
          404,
        );
      }

      return successResponse(res, null, "User deleted successfully");
    } catch (error) {
      return errorResponse(
        res,
        "Internal Server Error during deletion",
        500,
        error.message,
      );
    }
  }
}
