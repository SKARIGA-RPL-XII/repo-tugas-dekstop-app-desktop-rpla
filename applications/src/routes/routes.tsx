import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../pages/layouts/mainLayout";
import Dashboard from "../pages/dashboard";
import Pengguna from "../pages/pengguna";
import Kategori from "../pages/kategori";
import NotFound from "../pages/errors/NotFound";

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
    path: "employe",
    element: "",
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
