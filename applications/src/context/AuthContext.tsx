import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType, LoginPayload, User } from "../types/Auth";
import ApiClient from "../utils/apiClient";
import { AuthService } from "../services/authService";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem(TOKEN_KEY);
    const savedUser = localStorage.getItem(USER_KEY);

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));

      ApiClient.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${savedToken}`;
    }
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

      if (token) {
        await AuthService.logout(token);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setUser(null);
      setToken(null);

      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);

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
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
