import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../pages/layouts/mainLayout";
import Login from "../pages/login";
import NotFound from "../pages/errors/NotFound";
import Pengguna from "../pages/pengguna";
import Kategori from "../pages/kategori";
import Dashboard from "../pages/dashboard";

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
        element: <Kategori />,
      },
      {
        path: "pengguna",
        element: <Pengguna />,
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
