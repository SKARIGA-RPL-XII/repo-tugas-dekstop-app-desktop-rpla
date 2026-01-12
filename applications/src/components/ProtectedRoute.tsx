import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { hasRole } from "../utils/auth";
import AppLoader from "./AppLoader";

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles?: string[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { token, loading } = useAuth();

   if (loading) {
    return <AppLoader onDone={() => {}} />;
  }
  if (!token) return <Navigate to="/login" replace />;

  if (allowedRoles && !hasRole(token, allowedRoles)) {
    return <Navigate to="/403" replace />;
  }

  return children;
}
