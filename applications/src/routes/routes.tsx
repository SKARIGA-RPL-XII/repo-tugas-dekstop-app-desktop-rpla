import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../pages/layouts/mainLayout";
import Login from "../pages/auth/login";
import NotFound from "../pages/errors/NotFound";
import Pengguna from "../pages/pengguna";
import Dashboard from "../pages/dashboard";
import Category from "../pages/admin/categories";
import Kasir from "../pages/kasir/kasir";

const router = createBrowserRouter([
  {
    path: "admin",
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
        path: "Kategori",
        element: <Category />,
      },
      {
        path: "pengguna",
        element: <Pengguna />,
      },
    ],
  },
  {
    path: "kasir",
    element: <MainLayout />,
    children: [
      
      {
        path: "kasir",
        element: <Kasir />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/employe",
    element: <MainLayout />,
    children: [],
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
