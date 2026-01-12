import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "../types/Auth";

export function decodeToken(token: string): JwtPayload | null {
  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
}

export function hasRole(token: string, allowedRoles: string[]): boolean {
  const decoded = decodeToken(token);
  if (!decoded) return false;
  return allowedRoles.includes(decoded.role);
}
