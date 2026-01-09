import { createBrowserRouter } from "react-router-dom";
import TestingPage from "../pages/testing";
import MainLayout from "../layouts/mainLayout";
import Dashboard from "../pages/dashboard";

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
