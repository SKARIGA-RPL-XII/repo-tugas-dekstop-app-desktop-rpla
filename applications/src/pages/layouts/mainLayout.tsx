import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/layouts/navbar";
import Sidebar from "../../components/layouts/sidebar";

const MainLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const [animateSidebar, setAnimateSidebar] = useState("");
  const [animateButton, setAnimateButton] = useState("");

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsMobileOpen(!isMobileOpen);
    } else {
      setAnimateSidebar(isCollapsed ? "animate-expand" : "animate-collapse");
      setAnimateButton(
        isCollapsed
          ? "animate-expand-button"
          : "animate-collapse-button"
      );
      setIsCollapsed(!isCollapsed);

      setTimeout(() => {
        setAnimateSidebar("");
        setAnimateButton("");
      }, 600);
    }
  };

  const buttonLeft = isMobile ? 20 : isCollapsed ? 85 : 260;

  return (
    <div className="flex h-screen bg-[#F6F6F6]">
      {/* ===== SIDEBAR ===== */}
      <Sidebar
        collapsed={isCollapsed}
        mobileOpen={isMobileOpen}
        setMobileOpen={setIsMobileOpen}
        animateClass={animateSidebar}
      />

      {/* ===== TOGGLE BUTTON ===== */}
      <button
        onClick={toggleSidebar}
        className={`fixed top-9 -translate-y-1/2 w-[25px] h-[25px] rounded-full
          bg-[#5565FF] text-white z-50 shadow-md flex items-center justify-center
          transition-all ${animateButton}`}
        style={{ left: buttonLeft }}
      >
        <svg
          className={`w-4 h-4 transition-transform ${
            isMobile
              ? isMobileOpen
                ? "rotate-0"
                : "rotate-180"
              : isCollapsed
              ? "rotate-180"
              : ""
          }`}
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M15 6L9 12L15 18"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* ===== MAIN WRAPPER (overflow hidden) ===== */}
      <div
        className={`flex-1 transition-all duration-300 overflow-hidden ${
          isMobile
            ? "ml-0"
            : isCollapsed
            ? "md:ml-[100px]"
            : "md:ml-[275px]"
        }`}
      >
        {/* ===== SCROLL CONTAINER (Navbar STICKY DI SINI) ===== */}
        <div className="flex h-full flex-col overflow-y-auto">
          <Navbar />

          {/* ===== PAGE CONTENT ===== */}
          <main className="flex-1 p-4 lg:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
