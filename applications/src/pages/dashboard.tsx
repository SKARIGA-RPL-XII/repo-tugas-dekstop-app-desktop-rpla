import { useState } from "react";

const Dashboard = () => {
  const [active, setActive] = useState("Penjualan");

  /* ================= CARD ATAS ================= */
  const cards = [
    {
      label: "Penjualan",
      value: "6,5k",
      svg: (
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
          <rect width="50" height="50" rx="10" fill="#E6F0F7" />
          <path d="M12.8125 14.9598V36.1843H33.9164" stroke="#5565FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M17.6821 24.7545L21.7406 28.8361L28.2341 19.0402L33.9159 23.1218" stroke="#5565FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      label: "Pelanggan",
      value: "12k",
      svg: (
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="50" height="50" rx="10" fill="#FBF1E5"/>
        <path d="M14.5 33.1667V32C14.5 30.7623 14.9917 29.5753 15.8668 28.7002C16.742 27.825 17.929 27.3333 19.1667 27.3333H23.8333C25.071 27.3333 26.258 27.825 27.1332 28.7002C28.0083 29.5753 28.5 30.7623 28.5 32V33.1667M35.5 33.1667V32C35.5 30.7623 35.0083 29.5753 34.1332 28.7002C33.258 27.825 32.071 27.3333 30.8333 27.3333M27.9167 17.0317C28.4445 16.8457 29.0092 16.789 29.5634 16.8663C30.1177 16.9437 30.6453 17.1528 31.102 17.4761C31.5588 17.7994 31.9314 18.2276 32.1885 18.7246C32.4456 19.2217 32.5798 19.7731 32.5798 20.3327C32.5798 20.8924 32.4456 21.4438 32.1885 21.9409C31.9314 22.4379 31.5588 22.8661 31.102 23.1894C30.6453 23.5127 30.1177 23.7218 29.5634 23.7992C29.0092 23.8765 28.4445 23.8198 27.9167 23.6338M25 20.3333C25 21.2616 24.6313 22.1518 23.9749 22.8082C23.3185 23.4646 22.4283 23.8333 21.5 23.8333C20.5717 23.8333 19.6815 23.4646 19.0251 22.8082C18.3687 22.1518 18 21.2616 18 20.3333C18 19.4051 18.3687 18.5148 19.0251 17.8585C19.6815 17.2021 20.5717 16.8333 21.5 16.8333C22.4283 16.8333 23.3185 17.2021 23.9749 17.8585C24.6313 18.5148 25 19.4051 25 20.3333Z" stroke="#F59200" stroke-width="2" stroke-linecap="round"/>
       </svg>
      ),
    },
    {
      label: "Produk",
      value: "47k",
      svg: (
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
          <rect width="50" height="50" rx="10" fill="#2ED6A3" fillOpacity="0.15"/>
          <path d="M37 18.25L24.5 12L12 18.25V30.75L24.5 37L37 30.75V18.25Z" stroke="#009966" strokeWidth="2" strokeLinejoin="round"/>
          <path d="M12 18.25L24.5 24.5M24.5 24.5V37M24.5 24.5L37 18.25M30.75 15.125L18.25 21.375" stroke="#009966" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      label: "Pendapatan",
      value: "1,200k",
      svg: (
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
          <rect width="50" height="50" rx="10" fill="#F8E6F4"/>
          <path d="M35.4998 23.8368H35.2945L33.1677 17.615L14.9128 23.8368" stroke="#E000AD" strokeWidth="2" strokeLinecap="square"/>
          <path d="M27.9163 29.6667C27.9163 30.4402 27.6091 31.1821 27.0621 31.7291C26.5151 32.276 25.7732 32.5833 24.9997 32.5833C24.2261 32.5833 23.4843 32.276 22.9373 31.7291C22.3903 31.1821 22.083 30.4402 22.083 29.6667Z" stroke="#E000AD" strokeWidth="2" strokeLinecap="square"/>
          <path d="M36.0832 23.8333V35.5H13.9165V23.8333H36.0832Z" stroke="#E000AD" strokeWidth="2" strokeLinecap="square"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="w-full h-full flex flex-col gap-6 p-4 md:p-6">

      {/* ================= CARD ATAS ================= */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        {cards.map((card) => (
          <div
            key={card.label}
            onClick={() => setActive(card.label)}
            className={`w-full md:w-1/4 bg-white rounded-[15px] p-5
              flex items-center justify-between cursor-pointer border
              ${active === card.label ? "border-[#5565FF]" : "border-[#EBF1F6]"}
            `}
          >
            <div>
              <p className="text-[13px] font-semibold text-[#314158]">
                {card.label}
              </p>
              <p className="mt-2 text-[25px] font-semibold">
                {card.value}
              </p>
            </div>
            {card.svg}
          </div>
        ))}
      </div>

      {/* ================= BAGIAN TENGAH ================= */}
      <div className="flex flex-col md:flex-row gap-6">

{/* ===== LAPORAN PENJUALAN ===== */}
<div className="w-full md:flex-[2] bg-white border border-[#EBF1F6] rounded-[16px] p-6">
  <div className="flex justify-between items-center mb-6">
    <h3 className="text-sm font-semibold text-[#314158]">
      Laporan Penjualan
    </h3>

    <div className="flex gap-2">
      <button className="px-3 py-1 text-xs rounded-md bg-[#EEF2FF] text-[#5565FF]">
        Harian
      </button>
      <button className="px-3 py-1 text-xs rounded-md text-gray-400">
        Bulanan
      </button>
      <button className="px-3 py-1 text-xs rounded-md text-gray-400">
        Tahunan
      </button>
    </div>
  </div>

  {/* Chart */}
  <div className="flex items-end gap-8 h-[220px]">
    {[2019, 2020, 2021, 2022, 2023, 2024, 2025].map((year) => (
      <div key={year} className="flex flex-col items-center gap-2">
        <div className="flex items-end gap-1 h-full">
          <div className="w-3 bg-[#5565FF] rounded-sm h-[70%]" />
          <div className="w-3 bg-[#22C55E] rounded-sm h-[55%]" />
        </div>
        <span className="text-[11px] text-gray-400">{year}</span>
      </div>
    ))}
  </div>

  <div className="flex justify-center gap-6 mt-5 text-xs text-gray-500">
    <div className="flex items-center gap-2">
      <span className="w-3 h-3 bg-[#5565FF] rounded-full" />
      Tertinggi
    </div>
    <div className="flex items-center gap-2">
      <span className="w-3 h-3 bg-[#22C55E] rounded-full" />
      Terendah
    </div>
  </div>
</div>

{/* ===== PRODUK BARU ===== */}
<div className="w-full md:flex-1 bg-white border border-[#EBF1F6] rounded-[16px] p-6">
  <h3 className="text-sm font-semibold text-[#314158] mb-4">
    Produk Yang Baru Ditambahkan
  </h3>

  <div className="flex flex-col gap-4">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="flex items-center gap-3">
        <img
          src="https://via.placeholder.com/40"
          className="w-10 h-10 rounded-md"
        />

        <div className="flex-1">
          <p className="text-sm font-medium text-[#314158]">
            Snack Piattos
          </p>
          <p className="text-xs text-[#5565FF ]">
            Stok: 120
          </p>
        </div>
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="30" height="30" rx="15" transform="matrix(-1 0 0 1 30 0)" fill="#5565FF"/>
<path d="M15.1875 10.9871C15.3501 10.8247 15.5705 10.7334 15.8003 10.7334C16.0301 10.7334 16.2505 10.8247 16.413 10.9871L20.313 14.8871C20.4755 15.0497 20.5667 15.2701 20.5667 15.4999C20.5667 15.7297 20.4755 15.9501 20.313 16.1126L16.413 20.0126C16.2495 20.1705 16.0306 20.2578 15.8034 20.2559C15.5761 20.2539 15.3588 20.1627 15.1981 20.0021C15.0374 19.8414 14.9463 19.624 14.9443 19.3968C14.9423 19.1695 15.0297 18.9506 15.1875 18.7871L17.5336 16.3665H9.30026C9.07041 16.3665 8.84997 16.2752 8.68743 16.1127C8.5249 15.9502 8.43359 15.7297 8.43359 15.4999C8.43359 15.27 8.5249 15.0496 8.68743 14.8871C8.84997 14.7245 9.07041 14.6332 9.30026 14.6332H17.5336L15.1875 12.2126C15.0251 12.0501 14.9338 11.8297 14.9338 11.5999C14.9338 11.3701 15.0251 11.1497 15.1875 10.9871Z" fill="white"/>
</svg>
      </div>
    ))}
  </div>
</div>
</div>

{/* ================= TRANSAKSI TERBARU ================= */}
<div className="bg-white border border-[#EBF1F6] rounded-[16px] p-6">
<div className="flex justify-between items-center mb-4">
  <h3 className="text-sm font-semibold text-[#314158]">
    Transaksi Terbaru
  </h3>
  <button className="flex items-center gap-1 text-sm font-semibold text-[#5565FF] hover:underline ">
Lihat Semua <span className="text-base font-extrabold">&gt;</span>
</button>


</div>

<table className="w-full text-sm">
  <thead className="bg-[#F5F7FA] text-gray-500">
    <tr>
      <th className="py-3 px-4 text-left">Nomor Invoice</th>
      <th className="py-3 px-4 text-left">Tanggal Transaksi</th>
      <th className="py-3 px-4 text-left">Kasir</th>
      <th className="py-3 px-4 text-left">Total Harga</th>
      <th className="py-3 px-4 text-left">Jumlah Item</th>
      <th className="py-3 px-4 text-center">Aksi</th>
    </tr>
  </thead>
  <tbody>
    {[1, 2, 3, 4, 5].map((i) => (
      <tr key={i} className="border-b last:border-none">
        <td className="px-4 py-3">12345678</td>
        <td className="px-4 py-3">12 Desember 2026</td>
        <td className="px-4 py-3">Harry Potter</td>
        <td className="px-4 py-3">Rp. 120.000</td>
        <td className="px-4 py-3">10 Item</td>
        <td className="px-4 py-3 text-center">
          <button
            className="
              w-8 h-8
              flex items-center justify-center
              rounded-sm
              text-[#5565FF]
              cursor-pointer
              hover:scale-105
              hover:text-white
              transition">
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.5" y="0.5" width="25" height="25" rx="6.5" fill="white" fill-opacity="0.01"/>
<rect x="0.5" y="0.5" width="25" height="25" rx="6.5" stroke="#5565FF"/>
<path d="M13.0001 14.625C13.8976 14.625 14.6251 13.8975 14.6251 13C14.6251 12.1025 13.8976 11.375 13.0001 11.375C12.1027 11.375 11.3751 12.1025 11.3751 13C11.3751 13.8975 12.1027 14.625 13.0001 14.625Z" fill="#5565FF"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.24707 13C6.2824 9.70362 9.36202 7.3125 13.0001 7.3125C16.6382 7.3125 19.7178 9.70359 20.7531 13C19.7178 16.2964 16.6382 18.6875 13.0001 18.6875C9.36202 18.6875 6.28242 16.2964 5.24707 13ZM16.2501 13C16.2501 14.7949 14.7951 16.25 13.0001 16.25C11.2052 16.25 9.75014 14.7949 9.75014 13C9.75014 11.2051 11.2052 9.75 13.0001 9.75C14.7951 9.75 16.2501 11.2051 16.2501 13Z" fill="#5565FF"/>
</svg>  
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
</div>

    </div>
  );
};

export default Dashboard;


       