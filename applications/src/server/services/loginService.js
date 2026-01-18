import jwt from "jsonwebtoken";
import { Users } from "../model/users.model.js";

export const loginService = async (db, email, password) => {
  const user = await Users.findByEmail(db, email);
  if (!user) throw new Error("Invalid email or password");
  if (!user?.is_blocked === false)
    throw new Error(`user with name ${user?.username} is blocked`);

  if (!user.password) throw new Error("Authentication failed");

  const match = await Users.verifyPassword(password, user.password);

  if (!match) throw new Error("Invalid email or password");

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  return { user, token };
};
