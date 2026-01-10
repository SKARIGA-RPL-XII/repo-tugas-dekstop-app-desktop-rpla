import logo from "../assets/logo.png";
import rightImage from "../assets/Right.png";

export default function Login() {
  return (
    <div className="min-h-screen flex bg-white relative overflow-hidden">
      
      {/* Logo */}
      <div className="absolute top-6 left-6 md:top-8 md:left-10 z-20">
        <img
          src={logo}
          alt="SkarPOS Logo"
          className="h-9 md:h-10"
        />
      </div>

      {/* LEFT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 sm:px-10">
        <div className="w-full max-w-md">

          <h1 className="text-[42px] md:text-[48px] font-bold text-gray-900 mb-2">
            Login
          </h1>

          <p className="text-gray-400 text-sm mb-10">
            Selamat datang kembali ke SkarPOS
          </p>

          <form className="space-y-6">
            <input
              type="email"
              placeholder="Masukkan Email Anda"
              className="
                w-full
                border
                border-gray-300
                rounded-lg
                px-4
                py-3
                text-sm
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />

            <input
              type="password"
              placeholder="Masukkan Password Anda"
              className="
                w-full
                border
                border-gray-300
                rounded-lg
                px-4
                py-3
                text-sm
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />

            <div className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                className="rounded border-gray-300"
              />
              <span>Ingat Saya</span>
            </div>

            <button
              type="submit"
              className="
                w-full
                bg-blue-600
                text-white
                py-3
                rounded-full
                text-sm
                font-semibold
                hover:bg-blue-700
                transition
              "
            >
              Login
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden lg:flex w-1/2 relative">
        <img
          src={rightImage}
          alt="Illustration"
          className="
            absolute
            inset-0
            w-full
            h-full
            object0-contain          "
        />
      </div>
    </div>
  );
}
