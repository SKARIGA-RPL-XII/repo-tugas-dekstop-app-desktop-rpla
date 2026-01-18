import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../pages/layouts/mainLayout";
import Login from "../pages/auth/login";
import NotFound from "../pages/errors/NotFound";
import Pengguna from "../pages/pengguna";
import Dashboard from "../pages/admin/dashboards";
import Category from "../pages/admin/categories";
import ProtectedRoute from "../components/ProtectedRoute";
import App from "../App";
import DashboardKasir from "../pages/kasir/dashboards";
import ProtectedAuth from "../components/ProtectedAuth";
import Forbidden from "../pages/errors/Forbidden";
import { ProfilePage } from "../pages/auth/profile";
const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/admin",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <MainLayout />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <Dashboard /> },
          { path: "dashboard", element: <Dashboard /> },
          { path: "kategori", element: <Category /> },
          { path: "pengguna", element: <Pengguna /> },
          { path: "profil-saya", element: <ProfilePage /> },
        ],
      },
      {
        path: "/cashier",
        element: (
          <ProtectedRoute allowedRoles={["cashier"]}>
            <MainLayout />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <DashboardKasir /> },
          { path: "dashboard", element: <DashboardKasir /> },
          { path: "profil-saya", element: <ProfilePage /> },
        ],
      },
      {
        path: "/login",
        element: (
          <ProtectedAuth>
            <Login />
          </ProtectedAuth>
        ),
      },
      {
        path: "/",
        element: (
          <ProtectedAuth>
            <Login />
          </ProtectedAuth>
        ),
      },
      { path: "*", element: <NotFound /> },
      { path: "403", element: <Forbidden /> },
    ],
  },
]);

export default router;