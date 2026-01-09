const Dashboard = () => {
  return (
    <div className="w-full h-full flex flex-col gap-6 p-4 md:p-6">
  {/* Cards kecil */}
  <div className="flex flex-col md:flex-row gap-4 md:gap-6">
    {[
      { label: "Penjualan", value: "6,5k", color: "#5565FF" },
      { label: "Pelanggan", value: "12k", color: "#F59200" },
      { label: "Produk", value: "47k", color: "#009966" },
      { label: "Pendapatan", value: "1,200k", color: "#E000AD" },
    ].map((card) => (
      <div
        key={card.label}
        className="w-full md:w-1/4 bg-white rounded-[15px] p-5 flex flex-col"
      >
        <span className="text-[13px] font-semibold text-[#314158]">{card.label}</span>
        <span className="mt-2 text-[25px] font-semibold" style={{ color: card.color }}>
          {card.value}
        </span>
      </div>
    ))}
  </div>

  {/* Large cards */}
  <div className="flex flex-col md:flex-row gap-6">
    {/* Card besar kiri */}
    <div className="w-full md:flex-1 max-w-full md:max-w-[685px] bg-white rounded-[17px] p-6 flex flex-col">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h3 className="text-lg font-semibold text-[#314158]">Laporan Penjualan</h3>
        <div className="flex gap-2 flex-wrap">
          <button className="px-3 py-1 text-sm font-semibold text-[#5565FF] bg-[#E6EBFF] rounded-full hover:bg-[#D0D8FF]">
            Harian
          </button>
          <button className="px-3 py-1 text-sm font-semibold text-[#5E5E5E] bg-[#F3F3F3] rounded-full hover:bg-[#E0E0E0]">
            Bulanan
          </button>
          <button className="px-3 py-1 text-sm font-semibold text-[#5E5E5E] bg-[#F3F3F3] rounded-full hover:bg-[#E0E0E0]">
            Tahunan
          </button>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center text-[#314158]">
        {/* Konten besar */}
      </div>
    </div>

    {/* Card kanan */}
    <div className="w-full md:flex-1 max-w-full md:max-w-[350px] bg-white rounded-[15px] p-6 mt-4 md:mt-0">
      <h3 className="text-lg font-semibold text-[#314158]">Produk Yang Baru Ditambahkan</h3>
    </div>
  </div>
</div>

  );
};

export default Dashboard;
