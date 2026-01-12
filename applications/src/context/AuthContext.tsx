import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType, LoginPayload, User } from "../types/Auth";
import ApiClient from "../utils/apiClient";
import { AuthService } from "../services/authService";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

export async function initAuth() {
  const savedToken = localStorage.getItem(TOKEN_KEY);
  const savedUser = localStorage.getItem(USER_KEY);

  if (savedToken && savedUser) {
    ApiClient.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
    return { token: savedToken, user: JSON.parse(savedUser) as User };
  }

  return null;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initAuth().then((data) => {
      if (data) {
        setToken(data.token);
        setUser(data.user);
      }
      setLoading(false);
    });
  }, []);

  const login = async (payload: LoginPayload, remember: boolean) => {
    try {
      setLoading(true);
      const { token, user } = await AuthService.login(payload);

      setToken(token);
      setUser(user);

      ApiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      if (remember) {
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(USER_KEY, JSON.stringify(user));
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      if (token) await AuthService.logout(token);
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      setUser(null);
      setToken(null);

      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      sessionStorage.removeItem("splashPlayed");

      delete ApiClient.defaults.headers.common["Authorization"];
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
