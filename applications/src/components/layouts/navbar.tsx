import { useState, useRef, useEffect } from "react";
import { ChevronDown, Mail, User, LogOut, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getInitial, getRandomColor } from "../../utils/avatar";
import { useToast } from "../UI/ToastContext";

const Navbar = () => {
  const { user, logout, loading } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

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

  const displayName = user?.username || user?.email || "User";
  const avatarColor = getRandomColor(displayName);

  const handleLogout = async () => {
    try {
      await logout();
      addToast({
        title: "Keluar berhasil",
        description: "Sampai jumpa lagi 👋",
        type: "success",
      });
    } catch (err) {
      addToast({
        title: "Keluar gagal",
        description: "Terjadi kesalahan saat logout",
        type: "error",
      });
    }
  };

  const handleGoToProfile = () => {
    navigate("profil-saya");
    setDropdownOpen(false);
  };

  return (
    <nav className="sticky top-0 w-full min-h-[70px] h-[70px] border-b border-[#EBF1F6] bg-white flex items-center justify-between px-6 z-20 relative">
      <div
        className="ml-auto flex items-center gap-3 relative cursor-pointer"
        ref={dropdownRef}
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <div className="text-right leading-tight">
          <p className="text-[13px] font-bold text-[#000405]">{displayName}</p>
          <p className="text-[10px] font-semibold text-[#00040580]">
            {user?.email}
          </p>
        </div>

        <div
          className={`w-[45px] h-[45px] rounded-full flex items-center justify-center text-white font-bold text-lg ${avatarColor}`}
        >
          {getInitial(displayName)}
        </div>

        <ChevronDown className="w-4 h-4 text-[#00040580]" />

        {dropdownOpen && (
          <div className="absolute right-0 mt-68 w-[330px] bg-white shadow-lg rounded-lg p-4 flex flex-col gap-4 z-50">
            <div className="flex gap-4">
              <div
                className={`w-[80px] h-[80px] rounded-full flex items-center justify-center text-white font-bold text-3xl ${avatarColor}`}
              >
                {getInitial(displayName)}
              </div>

              <div className="flex flex-col justify-center gap-1">
                <p className="text-[17px] font-semibold text-[#434343]">
                  {displayName}
                </p>
                <p className="text-[12px] text-[#434343]">{user?.role}</p>
                <div className="flex items-center gap-2 text-[#434343] text-[13px]">
                  <Mail className="w-3 h-3" />
                  <span>{user?.email}</span>
                </div>
              </div>
            </div>

            <hr className="border-[#E5E5E5]" />

            <div className="flex gap-2">
              <button
                onClick={handleGoToProfile}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#5565FF] text-white rounded-md hover:bg-[#4250D3] transition"
              >
                <User className="w-4 h-4" />
                <span>Profil Saya</span>
              </button>

              <button
                onClick={handleLogout}
                disabled={loading}
                className={`flex-1 cursor-pointer flex items-center justify-center gap-2 px-3 py-2 rounded-md transition
                  ${
                    loading
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-[#E6F0F7] text-[#434343] hover:bg-[#D0E0F0]"
                  }
                `}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Logging out...</span>
                  </>
                ) : (
                  <>
                    <span>Keluar</span>
                    <LogOut className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
