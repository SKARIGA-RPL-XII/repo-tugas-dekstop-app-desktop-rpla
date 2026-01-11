import { Outlet } from "react-router-dom";
import Navbar from "../../components/layouts/navbar";
import Sidebar from "../../components/layouts/sidebar";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-[#F6F6F6]">
      <Sidebar />

      <div
        className="
    flex-1 flex flex-col overflow-hidden
    md:ml-[275px]
  "
      >
        <Navbar />

        <main className="flex-1 lg:p-6 p-4 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
