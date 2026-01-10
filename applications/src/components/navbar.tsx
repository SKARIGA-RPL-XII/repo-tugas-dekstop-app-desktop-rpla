// src/components/Navbar.tsx
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Mail, User, LogOut } from "lucide-react";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
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
    <nav className="sticky top-0 w-full h-[70px] border-b border-[#EBF1F6] bg-white flex items-center justify-between px-6 z-20 relative">
      {/* ===== BUTTON TOGGLE SIDEBAR ===== */}
      <button className="absolute -left-4 top-1/2 -translate-y-1/2 w-[25px] h-[25px] rounded-full bg-[#5565FF] z-50 shadow-md flex items-center justify-center">
        <svg
          className="rotate-180"
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width="30"
            height="30"
            rx="15"
            transform="matrix(-1 0 0 1 30 0)"
            fill="#5565FF"
          />
          <path
            d="M15.1875 10.9871C15.3501 10.8247 15.5705 10.7334 15.8003 10.7334C16.0301 10.7334 16.2505 10.8247 16.413 10.9871L20.313 14.8871C20.4755 15.0497 20.5667 15.2701 20.5667 15.4999C20.5667 15.7297 20.4755 15.9501 20.313 16.1126L16.413 20.0126C16.2495 20.1705 16.0306 20.2578 15.8034 20.2559C15.5761 20.2539 15.3588 20.1627 15.1981 20.0021C15.0374 19.8414 14.9463 19.624 14.9443 19.3968C14.9423 19.1695 15.0297 18.9506 15.1875 18.7871L17.5336 16.3665H9.30026C9.07041 16.3665 8.84997 16.2752 8.68743 16.1127C8.5249 15.9502 8.43359 15.7297 8.43359 15.4999C8.43359 15.27 8.5249 15.0496 8.68743 14.8871C8.84997 14.7245 9.07041 14.6332 9.30026 14.6332H17.5336L15.1875 12.2126C15.0251 12.0501 14.9338 11.8297 14.9338 11.5999C14.9338 11.3701 15.0251 11.1497 15.1875 10.9871Z"
            fill="white"
          />
        </svg>
      </button>

      {/* ===== RIGHT PROFILE SECTION ===== */}
      <div
        className="ml-auto flex items-center gap-3 relative cursor-pointer"
        ref={dropdownRef}
        onClick={() => setDropdownOpen(!dropdownOpen)} // klik container untuk toggle
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
              {/* LEFT: PROFILE IMAGE */}
              <img
                src="https://via.placeholder.com/100"
                alt="Profile Large"
                className="w-[80px] h-[80px] rounded-full object-cover"
              />

              {/* RIGHT: NAME, ROLE, EMAIL */}
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

            {/* HR */}
            <hr className="border-[#E5E5E5]" />

            {/* BUTTONS */}
            <div className="flex gap-2">
              {/* Profil Saya */}
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#5565FF] text-white rounded-md hover:bg-[#4250D3] transition">
                <User className="w-4 h-4" />
                <span>Profil Saya</span>
              </button>

              {/* Logout */}
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
