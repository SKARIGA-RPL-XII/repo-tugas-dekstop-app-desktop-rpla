import { createBrowserRouter } from "react-router-dom";
import TestingPage from "../pages/testing";

const router = createBrowserRouter([
  {
    path: "testing",
    element: <TestingPage />,
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
