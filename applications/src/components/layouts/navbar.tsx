// src/components/Navbar.tsx
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Mail, User, LogOut } from "lucide-react";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 w-full min-h-[70px] h-[70px] border-b border-[#EBF1F6] bg-white flex items-center justify-between px-6 z-20 relative">
      {/* ===== RIGHT PROFILE SECTION ===== */}
      <div
        className="ml-auto flex items-center gap-3 relative cursor-pointer"
        ref={dropdownRef}
        onClick={() => setDropdownOpen(!dropdownOpen)} 
      >
        {/* TEXT */}
        <div className="text-right leading-tight">
          <p className="text-[13px] font-bold text-[#000405]">Albus Dumbledor</p>
          <p className="text-[10px] font-semibold text-[#00040580]">
            albusdumbledor@gmail.com
          </p>
        </div>

        {/* AVATAR */}
        <img
          src="https://via.placeholder.com/45"
          alt="Profile"
          className="w-[45px] h-[45px] rounded-full object-cover"
        />

        {/* DROPDOWN ICON */}
        <ChevronDown className="w-4 h-4 text-[#00040580]" />

        {/* ===== DROPDOWN MENU ===== */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-68 w-[330px] bg-white shadow-lg rounded-lg p-4 flex flex-col gap-4 z-50">
            {/* PROFILE INFO */}
            <div className="flex gap-4">
              <img
                src="https://via.placeholder.com/100"
                alt="Profile Large"
                className="w-[80px] h-[80px] rounded-full object-cover"
              />

              <div className="flex flex-col justify-center gap-1">
                <p className="text-[17px] font-semibold text-[#434343]">
                  Albus Dumbledor
                </p>
                <p className="text-[12px] text-[#434343]">Admin</p>
                <div className="flex items-center gap-2 text-[#434343] text-[13px]">
                  <Mail className="w-3 h-3" />
                  <span>albusdumbledor@gmail.com</span>
                </div>
              </div>
            </div>

            <hr className="border-[#E5E5E5]" />

            <div className="flex gap-2">
              {/* Profil Saya */}
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#5565FF] text-white rounded-md hover:bg-[#4250D3] transition">
                <User className="w-4 h-4" />
                <span>Profil Saya</span>
              </button>

              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#E6F0F7] text-[#434343] rounded-md hover:bg-[#D0E0F0] transition">
                <span>Logout</span>
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
