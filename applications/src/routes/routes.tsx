import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../pages/layouts/mainLayout";
import Login from "../pages/login";
import NotFound from "../pages/errors/NotFound";

import Dashboard from "../pages/dashboard";
import Kategori from "../pages/kategori";

import Produk from "../pages/produk";
import ProdukTambah from "../pages/produk/tambah";
import ProdukEdit from "../pages/produk/edit";
import ProdukDetail from "../pages/produk/detail";

import Pengguna from "../pages/pengguna";
import PenggunaDetail from "../pages/pengguna/detail";

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <MainLayout />,
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
        element: <Kategori />,
      },

      // ===== PENGGUNA =====
      {
        path: "pengguna",
        children: [
          {
            index: true,
            element: <Pengguna />,              // /admin/pengguna
          },
          {
            path: "detail/:id",
            element: <PenggunaDetail />,        // /admin/pengguna/detail/1
          },
        ],
      },

      // ===== PRODUK =====
      {
        path: "produk",
        children: [
          {
            index: true,
            element: <Produk />,               // /admin/produk
          },
          {
            path: "tambah",
            element: <ProdukTambah />,         // /admin/produk/tambah
          },
          {
            path: "edit/:id",
            element: <ProdukEdit />,           // /admin/produk/edit/1
          },
          {
            path: "detail/:id",
            element: <ProdukDetail />,         // /admin/produk/detail/1
          },
        ],
      },
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
