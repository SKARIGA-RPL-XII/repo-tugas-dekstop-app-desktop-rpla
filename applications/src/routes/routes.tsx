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
import Kasir from './../pages/kasir/kasir/index';
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
          { path: "pengguna", element: <Pengguna /> },
        ],
      },
      {
        path: "/kasir",
        element: (
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        ),
        children: [
          { path: "", element: <DashboardKasir /> },
          { path: "kasir", element: <Kasir /> },
        ],
      },
      { path: "/login", element: <Login /> },
      { path: "/", element: <Login /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);


export default router;
