import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-[#F6F6F6]">
      <Sidebar />

      <div className="flex-1 flex flex-col bg-[#F6F6F6]">
        <Navbar />

        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
