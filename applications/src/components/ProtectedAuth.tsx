import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AppLoader from "./AppLoader";

export default function ProtectedAuth({ children }: { children: JSX.Element }) {
  const { token, user, loading } = useAuth();

  if (loading) return <AppLoader onDone={() => {}}/>;

  if (token && user) {
    if (user.role === "admin") return <Navigate to="/admin" replace />;
    if (user.role === "cashier") return <Navigate to="/cashier" replace />;
  }

  return children;
}
