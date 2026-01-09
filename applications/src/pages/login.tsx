import logo from "../assets/logo.png";
import rightImage from "../assets/Right.png";

export default function Login() {
  return (
    <div className="min-h-screen flex bg-white relative">
      
      {/* Logo kiri atas */}
      <div className="absolute top-6 left-10">
        <img
          src={logo}
          alt="SkarPOS Logo"
          className="h-8"
        />
      </div>

      {/* Left */}
      <div className="w-[45%] flex flex-col justify-center pl-24">
        
        <h2 className="text-2xl font-bold mb-2">Login</h2>
        <p className="text-gray-400 text-sm mb-10">
          Selamat datang kembali ke SkarPOS
        </p>

        <form className="space-y-5">
          <input
            type="email"
            placeholder="Masukkan Email Anda"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none"
          />

          <input
            type="password"
            placeholder="Masukkan Password Anda"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none"
          />

          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" />
            Ingat Saya
          </label>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-full text-sm font-semibold"
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
            top-0
            right-1/2
            h-full
            object-contain
            translate-x-1/2
          "
        />
      </div>
    </div>
  );
}
