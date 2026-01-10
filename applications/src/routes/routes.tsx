import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../pages/layouts/mainLayout";
import Dashboard from "../pages/dashboard";
import Login from "../pages/login"; // ⬅️ sesuaikan path Login.jsx kamu
import NotFound from "../pages/errors/NotFound";
import Pengguna from "../pages/pengguna";
import Kategori from "../pages/kategori";

const router = createBrowserRouter([
  {
    path: "/dashboard",
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
    element: (
      <div className="text-center font-bold text-[5rem]">Landing Page</div>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
