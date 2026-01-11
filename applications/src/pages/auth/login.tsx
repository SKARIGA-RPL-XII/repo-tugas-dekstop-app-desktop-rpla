import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import rightImage from "../../assets/right.png";

export default function Login() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex bg-white relative">
      {/* Logo kiri atas */}
      <div className="absolute top-6 left-10">
        <img src={logo} alt="SkarPOS Logo" className="h-[50px] w-[240px]" />
      </div>

      {/* Left */}
      <div className="w-[60%] flex flex-col justify-center pl-60">
        <h2 className="text-[55px] font-bold mb-2">Login</h2>
        <p className="text-gray-400 text-sm mb-10 font-semibold">
          Selamat datang kembali ke SkarPOS
        </p>

        <form className="space-y-5">
          <input
            type="email"
            placeholder="Masukkan Email Anda"
            className="w-full border-b border-gray-300 px-4 py-3 text-sm focus:outline-none"
          />

          <input
            type="password"
            placeholder="Masukkan Password Anda"
            className="w-full border-b border-gray-300 px-4 py-3 text-sm focus:outline-none"
          />

          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" />
            Ingat Saya
          </label>

          <button
            onClick={() => navigate("/admin/dashboard")}
            type="button"
            className="w-full bg-blue-600 text-white py-3 rounded-full text-sm font-semibold cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>

      {/* Right */}
      <div className="w-[75%] relative overflow-hidden px-20">
        <img
          src={rightImage}
          alt="Right Illustration"
          className="
            absolute
            -top-0.2
            right-62
            w-full
            h-full
            object-contain
            translate-x-1/2
          "
        />
      </div>
    </div>
  );
}
