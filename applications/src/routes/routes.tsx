import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import MainLayout from "../pages/layouts/mainLayout";
import Login from "../pages/auth/login";
import NotFound from "../pages/errors/NotFound";

import Dashboard from "../pages/admin/dashboards";
import Category from "../pages/admin/categories";
import DashboardKasir from "../pages/kasir/dashboards";

import Pengguna from "../pages/admin/pengguna";
import PenggunaDetail from "../pages/admin/pengguna/detail";

import ProtectedRoute from "../components/ProtectedRoute";
import Produk from "../pages/produk";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/admin",
        element: (
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <Dashboard /> },
          { path: "dashboard", element: <Dashboard /> },
          { path: "kategori", element: <Category /> },
          { path: "produk", element: <Produk /> },


          {
            path: "pengguna",
            children: [
              { index: true, element: <Pengguna /> },
              { path: "detail/:id", element: <PenggunaDetail /> },
            ],
          },

          // sementara (maintenance)
          { path: "kasir", element: <DashboardKasir /> },
        ],
      },

      { path: "/login", element: <Login /> },
      { path: "/", element: <Login /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
