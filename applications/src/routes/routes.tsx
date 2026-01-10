import { createBrowserRouter } from "react-router-dom";
import TestingPage from "../pages/testing";
import MainLayout from "../layouts/mainLayout";
import Dashboard from "../pages/dashboard";
import Pengguna from "../pages/pengguna";
import Kategori from "../pages/kategori";

const router = createBrowserRouter([
  {
    path: "testing",
    element: <TestingPage />,
  },
  {
    path: "dashboard",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      
    ],
  },
  {
    path: "Kategori",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Kategori />,
      },
      
    ],
  },
    {
    path: "pengguna",
    element: <MainLayout />,
    children: [
      {
        index: true,
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
    path: "admin",
    element: "",
    children: [],
  },
  {
    path: "/",
    element: (
      <div className="text-center font-bold text-[5rem]">Landing Page</div>
    ),
  },
]);

export default router;
