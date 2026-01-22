import { useState, useEffect } from "react";
import { ArrowUpFromLine, Calendar } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import kasirLogo from "../../../assets/kasir-logo.svg";
import { useDashboard } from "../../../hooks/dashboard/useDashboard";
import { useNavigate } from "react-router-dom";

const DashboardKasir = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const displayName = user?.username || user?.email || "User";
  const [openDate, setOpenDate] = useState(false);
  const [range, setRange] = useState<"daily" | "monthly" | "yearly">("daily");
  const [startDate, setStartDate] = useState("2025-12-01");
  const [endDate, setEndDate] = useState("2025-12-31");

  const { data, loading, error } = useDashboard({
    startDate,
    endDate,
  });

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-gray-500">Memuat data dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  const summary = data?.summary || {
    total_transactions: 0,
    total_products: 0,
    total_revenue: 0,
  };

  const latestProducts = data?.latest_products || [];
  const latestTransactions = data?.latest_transactions || [];
  const chartData = data?.chart || [];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID");
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  /* ================= CARD ATAS ================= */
  const cards = [
    {
      label: "Pendapatan Total",
      value: formatCurrency(summary.total_revenue),
      bg: "bg-white",
      text: "text-green-600",
      percent: "+12%",
      percentBg: "#E0F9F2",
      percentText: "#009966",
      description: "Dibandingkan periode sebelumnya",
      svg: (
        <img src={kasirLogo} alt="Kasir Logo" className="w-[80px] h-[80px]" />
      ),
      fullWidth: true,
    },
    {
      label: "Total Transaksi",
      value: summary.total_transactions.toString(),
      bg: "bg-[#FFFFFF]",
      text: "text-[#F59200]",
      percent: "+8%",
      percentBg: "#E0F9F2",
      percentText: "#009966",
      svg: (
        <svg
          width="50"
          height="50"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="50" height="50" rx="10" fill="#FBF1E5" />
          <path
            d="M14.5 33.1667V32C14.5 30.7623 14.9917 29.5753 15.8668 28.7002C16.742 27.825 17.929 27.3333 19.1667 27.3333H23.8333C25.071 27.3333 26.258 27.825 27.1332 28.7002C28.0083 29.5753 28.5 30.7623 28.5 32V33.1667M35.5 33.1667V32C35.5 30.7623 35.0083 29.5753 34.1332 28.7002C33.258 27.825 32.071 27.3333 30.8333 27.3333M27.9167 17.0317C28.4445 16.8457 29.0092 16.789 29.5634 16.8663C30.1177 16.9437 30.6453 17.1528 31.102 17.4761C31.5588 17.7994 31.9314 18.2276 32.1885 18.7246C32.4456 19.2217 32.5798 19.7731 32.5798 20.3327C32.5798 20.8924 32.4456 21.4438 32.1885 21.9409C31.9314 22.4379 31.5588 22.8661 31.102 23.1894C30.6453 23.5127 30.1177 23.7218 29.5634 23.7992C29.0092 23.8765 28.4445 23.8198 27.9167 23.6338M25 20.3333C25 21.2616 24.6313 22.1518 23.9749 22.8082C23.3185 23.4646 22.4283 23.8333 21.5 23.8333C20.5717 23.8333 19.6815 23.4646 19.0251 22.8082C18.3687 22.1518 18 21.2616 18 20.3333C18 19.4051 18.3687 18.5148 19.0251 17.8585C19.6815 17.2021 20.5717 16.8333 21.5 16.8333C22.4283 16.8333 23.3185 17.2021 23.9749 17.8585C24.6313 18.5148 25 19.4051 25 20.3333Z"
            stroke="#F59200"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      label: "Total Produk",
      value: summary.total_products.toString(),
      bg: "bg-[#FFFFFF]",
      text: "text-[#5565FF]",
      percent: "+5%",
      percentBg: "#E0F9F2",
      percentText: "#009966",
      svg: (
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
          <rect width="50" height="50" rx="10" fill="#E6F0F7" />
          <path
            d="M12.8125 14.9598V36.1843H33.9164"
            stroke="#5565FF"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17.6821 24.7545L21.7406 28.8361L28.2341 19.0402L33.9159 23.1218"
            stroke="#5565FF"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

    /* ================= CHART ================= */
  const chartLabels = chartData.map((item: any) => {
    const date = new Date(item.date);
    return date.toLocaleDateString("id-ID", {
      month: "short",
      day: "numeric",
    });
  });
  const chartValues = chartData.map((item: any) => item.total);

  const chartOptions: ApexOptions = {
    chart: {
      type: "bar",
      height: 248,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 5,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 2, colors: ["transparent"] },
    xaxis: {
      categories: chartLabels.length > 0 ? chartLabels : ["No Data"],
    },
    fill: { opacity: 1 },
    colors: ["#5565FF"],
    tooltip: {
      y: {
        formatter: (value: number) => {
          return formatCurrency(value);
        },
      },
      x: {
        formatter: (value: any, { series, seriesIndex, dataPointIndex }: any) => {
          const fullDate = new Date(chartData[dataPointIndex]?.date);
          return fullDate.toLocaleDateString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          });
        },
      },
    },
  };

  const series = [
    { name: "Total Penjualan", data: chartValues.length > 0 ? chartValues : [0] },
  ];

  const handleViewDetail = (transactionId: string) => {
    navigate(`/kasir/riwayat/${transactionId}`);
  };

  return (
    <div className="w-full h-full flex flex-col gap-5 ">
      {/* ================= GREETING CARD ================= */}
      <div className="bg-white rounded-[15px] p-5 flex items-center justify-between">
        {/* KIRI */}
        <div className="flex items-center gap-2">
          {/* SVG Tangan Melambai */}
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Hand */}
            <path
              d="M19 22V14C19 12.8954 19.8954 12 21 12C22.1046 12 23 12.8954 23 14V22"
              stroke="#5565FF"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M23 22V13C23 11.8954 23.8954 11 25 11C26.1046 11 27 11.8954 27 13V22"
              stroke="#5565FF"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M27 22V15C27 13.8954 27.8954 13 29 13C30.1046 13 31 13.8954 31 15V23"
              stroke="#5565FF"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M19 22C18 22 17 22.8 17 24.5C17 29 20 32 25 32C30 32 32 29 32 26V24"
              stroke="#5565FF"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Wave */}
            <path
              d="M34 14C35.5 15.5 35.5 18.5 34 20"
              stroke="#5565FF"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>

          {/* Text */}
          <div className="flex items-center gap-1">
            <p className="text-[13px] font-semibold text-[#314158]">
              Hi {displayName},
            </p>
            <p className="text-[13px] text-[#314158]">
              berikut data toko Anda pada hari ini
            </p>
          </div>
        </div>

        {/* KANAN */}
        <div
          className="relative flex items-center gap-3 cursor-pointer"
          onClick={() => setOpenDate(!openDate)}
        >
          {/* Kalender */}
          <div className="w-10 h-10 flex justify-center items-center bg-[#E6F0F7] rounded-sm">
            <Calendar className="w-12 h-12 p-2 text-[#5565FF]" />
          </div>

          {/* Filter Text */}
          <div>
            <p className="text-[12px] font-semibold text-[#314158]">
              Filter Periode
            </p>
            <p className="text-[12px] text-[#8B8B8B]">
              {startDate} – {endDate}
            </p>
          </div>

          {/* Dropdown */}
          <div className="w-6 h-6 rounded-full bg-[#EEF2FF] flex items-center justify-center">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="#5565FF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          {openDate && (
            <div className="absolute right-0 top-full mt-6 bg-white border border-[#EBF1F6] rounded-[12px] p-5 z-20 shadow-lg">
              <div className="flex gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] text-[#314158] font-semibold">
                    Tanggal Awal
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border rounded-md px-2 py-1 text-[12px]"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[11px] text-[#314158] font-semibold">
                    Tanggal Akhir
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="border rounded-md px-2 py-1 text-[12px]"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ================= CARD ATAS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className={`rounded-[15px] p-5 flex items-center justify-between ${
              card.bg
            } ${card.fullWidth ? "md:col-span-2" : "md:col-span-1"} shadow-sm`}
          >
            {/* KIRI: Text */}
            <div className="flex-1">
              <p className="text-[13px] font-semibold text-[#314158]">
                {card.label}
              </p>

              <p className={`mt-2 text-[25px] font-semibold ${card.text}`}>
                {card.value}
              </p>

              <div className="flex items-center gap-2 mt-1">
                <div
                  className="w-[20px] h-[20px] rounded-full flex items-center justify-center"
                  style={{ backgroundColor: card.percentBg }}
                >
                  <ArrowUpFromLine className="w-3 h-3 text-[#009966]" />
                </div>
                <div className="flex gap-2">
                  <span
                    className="text-[13px] font-medium"
                    style={{ color: card.percentText }}
                  >
                    {card.percent}
                  </span>
                  {card.description && (
                    <span className="text-[13px] text-gray-500">
                      {card.description}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* KANAN: Icon */}
            <div>{card.svg}</div>
          </div>
        ))}
      </div>

      {/* ================= BAGIAN TENGAH ================= */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* LAPORAN PENJUALAN */}
        <div className="w-full md:flex-[2] bg-white border border-[#EBF1F6] rounded-[16px] p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[17px] font-semibold text-[#314158]">
              Laporan Penjualan
            </h3>
            <div className="flex gap-2">
              <button 
                onClick={() => setRange("daily")}
                className={`px-3 py-1 text-xs rounded-md transition ${
                  range === "daily"
                    ? "bg-[#EEF2FF] text-[#5565FF] font-medium"
                    : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                }`}
              >
                Harian
              </button>
              <button 
                onClick={() => setRange("monthly")}
                className={`px-3 py-1 text-xs rounded-md transition ${
                  range === "monthly"
                    ? "bg-[#EEF2FF] text-[#5565FF] font-medium"
                    : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                }`}
              >
                Bulanan
              </button>
              <button 
                onClick={() => setRange("yearly")}
                className={`px-3 py-1 text-xs rounded-md transition ${
                  range === "yearly"
                    ? "bg-[#EEF2FF] text-[#5565FF] font-medium"
                    : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                }`}
              >
                Tahunan
              </button>
            </div>
          </div>
          {chartData.length > 0 ? (
            <Chart
              options={chartOptions}
              series={series}
              type="bar"
              height={248}
            />
          ) : (
            <div className="flex items-center justify-center h-[248px] text-gray-400">
              Tidak ada data penjualan
            </div>
          )}
        </div>

        {/* PRODUK BARU */}
        <div className="w-full md:flex-1 bg-white border border-[#EBF1F6] rounded-[16px] p-6 shadow-sm">
          <h3 className="text-[17px] font-semibold text-[#314158] mb-4">
            Produk Terbaru
          </h3>
          <div className="flex flex-col gap-4">
            {latestProducts.length > 0 ? (
              latestProducts.map((product: any) => (
                <div key={product.id} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md bg-[#EEF2FF] flex items-center justify-center">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 1L2 6V14C2 16.2091 5.58172 18 10 18C14.4183 18 18 16.2091 18 14V6L10 1Z"
                        fill="#5565FF"
                        fillOpacity="0.2"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-[13px] font-medium text-[#314158]">
                      {product.product_name}
                    </p>
                    <p className="text-[13px] text-[#5565FF]">
                      Stok: {product.stock}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-gray-400">
                Tidak ada produk terbaru
              </div>
            )}
          </div>
        </div>
      </div>

      {/* TRANSAKSI TERBARU */}
      <div className="bg-white border border-[#EBF1F6] rounded-[16px] p-6 min-w-0 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-[17px] font-semibold text-[#314158]">
            Transaksi Terbaru
          </h3>
          <button
            onClick={() => navigate("/kasir/riwayat")}
            className="flex items-center gap-1 text-sm font-semibold text-[#5565FF] hover:underline"
          >
            Lihat Semua <span className="text-base font-extrabold">&gt;</span>
          </button>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-[#E2E8F0] text-black">
              <tr>
                <th className="py-3 px-4 text-left">Nomor Invoice</th>
                <th className="py-3 px-4 text-left">Tanggal Transaksi</th>
                <th className="py-3 px-4 text-left">Nama Kasir</th>
                <th className="py-3 px-4 text-left">Total Harga</th>
                <th className="py-3 px-4 text-left">Jumlah Item</th>
                <th className="py-3 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {latestTransactions.length > 0 ? (
                latestTransactions.map((transaction: any) => (
                  <tr
                    key={transaction.id}
                    className="border-b last:border-none border-[#E2E8F0] text-[14px] hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 font-medium">{transaction.invoice}</td>
                    <td className="px-4 py-3">
                      <div className="font-semibold">{formatDate(transaction.date)}</div>
                      <div className="text-[13px] text-[#8B8B8B]">
                        {formatTime(transaction.date)}
                      </div>
                    </td>
                    <td className="px-4 py-3">{transaction.cashier || "-"}</td>
                    <td className="px-4 py-3 font-medium">
                      {formatCurrency(transaction.total)}
                    </td>
                    <td className="px-4 py-3">{transaction.item_count} Item</td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleViewDetail(transaction.id)}
                        className="w-[26px] h-[26px] flex items-center justify-center rounded-lg bg-white border border-[#5565FF]/70 text-[#5565FF] hover:bg-[#5565FF] hover:text-white transition"
                        title="Lihat Detail"
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 26 26"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.0001 14.625C13.8976 14.625 14.6251 13.8975 14.6251 13C14.6251 12.1025 13.8976 11.375 13.0001 11.375C12.1027 11.375 11.3751 12.1025 11.3751 13C11.3751 13.8975 12.1027 14.625 13.0001 14.625Z"
                            fill="currentColor"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.24707 13C6.2824 9.70362 9.36202 7.3125 13.0001 7.3125C16.6382 7.3125 19.7178 9.70359 20.7531 13C19.7178 16.2964 16.6382 18.6875 13.0001 18.6875C9.36202 18.6875 6.28242 16.2964 5.24707 13ZM16.2501 13C16.2501 14.7949 14.7951 16.25 13.0001 16.25C11.2052 16.25 9.75014 14.7949 9.75014 13C9.75014 11.2051 11.2052 9.75 13.0001 9.75C14.7951 9.75 16.2501 11.2051 16.2501 13Z"
                            fill="currentColor"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                    Tidak ada transaksi terbaru
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardKasir;