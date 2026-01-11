import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../pages/layouts/mainLayout";
import Login from "../pages/auth/login";
import NotFound from "../pages/errors/NotFound";
import Pengguna from "../pages/pengguna";
import Dashboard from "../pages/admin/dashboards";
import Category from "../pages/admin/categories";
import ProtectedRoute from "../components/ProtectedRoute";

import KasirDashboard from "../pages/kasir/dashboards";

const router = createBrowserRouter([
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "kategori",
        element: <Category />,
      },
      {
        path: "pengguna",
        element: <Pengguna />,
      },
      {
        path: "kasir",
        element: <KasirDashboard />,
      }
    ],
  },

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
