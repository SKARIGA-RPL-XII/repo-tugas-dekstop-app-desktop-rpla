import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../pages/layouts/mainLayout";
import Login from "../pages/auth/login";
import NotFound from "../pages/errors/NotFound";
import Dashboard from "../pages/admin/dashboards";
import Category from "../pages/admin/categories";
import ProtectedRoute from "../components/ProtectedRoute";
import App from "../App";
import DashboardKasir from "../pages/kasir/dashboards";
import Kasir from "./../pages/kasir/kasir/index";
import ProtectedAuth from "../components/ProtectedAuth";
import Forbidden from "../pages/errors/Forbidden";
import { ProfilePage } from "../pages/auth/profile";
import Pengguna from "../pages/admin/pengguna";
import PenggunaDetail from "../pages/admin/pengguna/detail";

import Produk from "../pages/admin/produk";
import ProdukTambah from "../pages/admin/produk/tambah";
import ProdukEdit from "../pages/admin/produk/edit";
import ProdukDetail from "../pages/admin/produk/detail";
import Riwayat from "../pages/kasir/riwayat";
import RiwayatDetail from "../pages/kasir/riwayat/detail";

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
          { path: "pengguna/:id/detail", element: <PenggunaDetail /> },
          { path: "riwayat-penjualan", element: <Riwayat /> },

          // ================== PRODUK ==================
          { path: "produk", element: <Produk /> },
          { path: "produk/tambah", element: <ProdukTambah /> },
          { path: "produk/:id/detail", element: <ProdukDetail /> },
          { path: "produk/:id/edit", element: <ProdukEdit /> },
          { path: "profil-saya", element: <ProfilePage /> },
          { path: "riwayat-penjualan/detail/:id", element: <RiwayatDetail /> },
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
          { path: "kasir", element: <Kasir /> },
          { path: "riwayat-penjualan", element: <Riwayat /> },
          { path: "riwayat-penjualan/detail/:id", element: <RiwayatDetail /> },
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

      { path: "403", element: <Forbidden /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
