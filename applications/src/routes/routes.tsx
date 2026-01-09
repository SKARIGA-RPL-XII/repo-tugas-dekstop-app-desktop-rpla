import { createBrowserRouter } from "react-router-dom";
import TestingPage from "../pages/testing";
import MainLayout from "../layouts/mainLayout";
import Dashboard from "../pages/dashboard";
import Login from "../pages/login"; // ⬅️ sesuaikan path Login.jsx kamu

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="text-center font-bold text-[5rem]">
        Landing Page
      </div>
    ),
  },

  {
    path: "/login",
    element: <Login />, // ✅ ROUTE LOGIN
  },

  {
    path: "/testing",
    element: <TestingPage />,
  },

  {
    path: "/dashboard",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
    ],
  },

  {
    path: "/employe",
    element: <MainLayout />, // bisa diganti nanti
    children: [],
  },

  {
    path: "/admin",
    element: <MainLayout />, // bisa diganti nanti
    children: [],
  },
]);

export default router;
