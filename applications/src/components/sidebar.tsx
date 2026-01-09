import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";

const Sidebar = () => {
  return (
<aside
  className="
    sidebar flex flex-col items-center 
    w-[20%] min-w-[200px] max-w-[275px] 
    min-h-screen border-r border-[#EBF1F6] bg-white z-10
    hidden md:flex
  "
>
      <div className="logo my-6">
        <img src={Logo} alt="Logo" className="mx-auto w-[215px] h-[45px] my-4" />
      </div>

      <nav className="flex flex-col w-full px-4 space-y-4">
        <div>
          <p className="text-[#000405] uppercase text-xs font-semibold mb-2 px-3 mb-3">
            Beranda
          </p>
          <ul className="space-y-1">
            <li>
              <Link
                to="/dashboard"
                className="block py-2 px-8 mx-2 rounded-lg hover:bg-[#e6f0f7] text-[13px] text-[#5E5E5E] hover:text-[#5565ff] transition-colors duration-300"
              >
                Beranda
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-[#000405] uppercase text-xs font-semibold mb-2 px-3 mb-3">
            Transaksi
          </p>
          <ul className="space-y-1">
            <li>
              <Link
                to="/kasir"
                className="block py-2 px-8 mx-2 rounded-lg hover:bg-[#e6f0f7] text-[13px] text-[#5E5E5E] hover:text-[#5565ff] transition-colors duration-300"
              >
                Kasir
              </Link>
            </li>
            <li>
              <Link
                to="/riwayat-penjualan"
                className="block py-2 px-8 mx-2 rounded-lg hover:bg-[#e6f0f7] text-[13px] text-[#5E5E5E] hover:text-[#5565ff] transition-colors duration-300"
              >
                Riwayat Penjualan
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-[#000405] uppercase text-xs font-semibold mb-2 px-3 mb-3">
            Produk
          </p>
          <ul className="space-y-1">
            <li>
              <Link
                to="/kategori"
                className="block py-2 px-8 mx-2 rounded-lg hover:bg-[#e6f0f7] text-[13px] text-[#5E5E5E] hover:text-[#5565ff] transition-colors duration-300"
              >
                Kategori
              </Link>
            </li>
            <li>
              <Link
                to="/produk"
                className="block py-2 px-8 mx-2 rounded-lg hover:bg-[#e6f0f7] text-[13px] text-[#5E5E5E] hover:text-[#5565ff] transition-colors duration-300"
              >
                Produk
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-[#000405] uppercase text-xs font-semibold mb-2 px-3 mb-3">
            Akun
          </p>
          <ul className="space-y-1">
            <li>
              <Link
                to="/pengguna"
                className="block py-2 px-8 mx-2 rounded-lg hover:bg-[#e6f0f7] text-[13px] text-[#5E5E5E] hover:text-[#5565ff] transition-colors duration-300"
              >
                Pengguna
              </Link>
            </li>
            <li>
              <Link
                to="/profil-saya"
                className="block py-2 px-8 mx-2 rounded-lg hover:bg-[#e6f0f7] text-[13px] text-[#5E5E5E] hover:text-[#5565ff] transition-colors duration-300"
              >
                Profil Saya
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
