import { createBrowserRouter } from "react-router-dom";
import TestingPage from "../pages/testing";

export const router = () => {
  return createBrowserRouter([
    {
      path: "testing",
      element: <TestingPage />,
    },
    {
      path: "/",
      element: (
        <div className="text-center font-bold text-[5rem]">Landing Page</div>
      ),
    },
  ]);
};
