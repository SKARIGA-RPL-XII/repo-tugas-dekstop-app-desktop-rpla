import { useState, useEffect } from "react";
import { Trash2, Pencil, Search, Calendar, Eye } from "lucide-react";

import DeleteAlert from "../../components/DeleteAlert";
import Pagination from "../../components/Pagination";
import { useNavigate } from "react-router-dom";

const Produk = () => {
  const [openHapus, setOpenHapus] = useState(false);
  const [selectedProduk, setSelectedProduk] = useState("");

  // search & filter
  const [search, setSearch] = useState("");
  const [filterDate, setFilterDate] = useState("");

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const navigate = useNavigate();


  // DATA
  const dataProduk = [
    {
      id: 1,
      nama: "Snack Piattos",
      kode: "PR001",
      kategori: "Snack",
      harga: "Rp 10.000",
      stok: 120,
      status: "Aktif",
      tanggal: "2026-12-12",
    },
    {
      id: 2,
      nama: "Snack Piattos",
      kode: "PR001",
      kategori: "Snack",
      harga: "Rp 10.000",
      stok: 3,
      status: "Tidak Aktif",
      tanggal: "2026-12-12",
    },
    {
      id: 3,
      nama: "Snack Piattos",
      kode: "PR001",
      kategori: "Snack",
      harga: "Rp 10.000",
      stok: 0,
      status: "Aktif",
      tanggal: "2026-12-12",
    },
    {
      id: 4,
      nama: "Snack Piattos",
      kode: "PR001",
      kategori: "Snack",
      harga: "Rp 10.000",
      stok: 120,
      status: "Tidak Aktif",
      tanggal: "2026-12-12",
    },
    {
      id: 5,
      nama: "Snack Piattos",
      kode: "PR001",
      kategori: "Snack",
      harga: "Rp 10.000",
      stok: 3,
      status: "Aktif",
      tanggal: "2026-12-12",
    },
    {
      id: 6,
      nama: "Snack Piattos",
      kode: "PR001",
      kategori: "Snack",
      harga: "Rp 10.000",
      stok: 0,
      status: "Tidak Aktif",
      tanggal: "2026-12-12",
    },
  ];

  // FILTERING
  const filteredData = dataProduk.filter((item) => {
    const matchSearch = item.nama
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchDate = filterDate
      ? item.tanggal === filterDate
      : true;

    return matchSearch && matchDate;
  });

  // PAGINATION LOGIC
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // reset page saat search / filter berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterDate]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 font-montserrat relative">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Daftar Produk
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Beranda / <span className="text-indigo-600">Daftar Produk</span>
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate("/admin/produk/tambah")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          + Tambah Produk
        </button>
      </div>

      {/* CARD */}
      <div className="bg-white rounded-2xl shadow-sm p-6">

        {/* SEARCH & FILTER */}
        <div className="flex items-center gap-4 mb-6">

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Telusuri sesuatu..."
              className="h-10 w-64 pl-9 pr-4 border border-gray-200 rounded-md text-sm focus:ring-1 focus:ring-indigo-500 outline-none"
            />
          </div>

          <label className="h-10 flex items-center gap-2 px-4 border border-gray-200 rounded-md text-sm text-gray-500 cursor-pointer hover:bg-gray-50">
            <Calendar className="w-4 h-4" />
            Tanggal Dibuat
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="absolute opacity-0 pointer-events-none"
            />
          </label>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-100 text-gray-600">
                <th className="py-3 px-4 text-left rounded-l-lg">Nama Produk</th>
                <th className="py-3 px-4 text-left">Kategori</th>
                <th className="py-3 px-4 text-left">Harga</th>
                <th className="py-3 px-4 text-left">Stok</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Dibuat Tanggal</th>
                <th className="py-3 px-4 text-center rounded-r-lg">Aksi</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {paginatedData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="font-medium text-gray-800">
                      {item.nama}
                    </div>
                    <div className="text-xs text-gray-400">
                      Kode: {item.kode}
                    </div>
                  </td>

                  <td className="py-3 px-4">{item.kategori}</td>
                  <td className="py-3 px-4">{item.harga}</td>

                  <td className="py-3 px-4 font-medium">
                    <span
                      className={
                        item.stok === 0
                          ? "text-red-500"
                          : item.stok <= 5
                          ? "text-orange-500"
                          : "text-indigo-600"
                      }
                    >
                      {item.stok}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-md text-xs font-medium ${
                        item.status === "Aktif"
                          ? "bg-emerald-100 text-emerald-600"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    {new Date(item.tanggal).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </td>

                  <td className="py-3 px-4">
                    <div className="flex justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => navigate(`/admin/produk/detail/${item.id}`)}
                        className="w-8 h-8 rounded-full border border-indigo-400 text-indigo-500 hover:bg-indigo-50"
                      >
                        <Eye className="w-4 h-4 mx-auto" />
                      </button>
                      <button
                        type="button"
                        onClick={() => navigate(`/admin/produk/edit/${item.id}`)}
                        className="w-8 h-8 rounded-full border border-orange-400 text-orange-500 hover:bg-orange-50"
                      >
                        <Pencil className="w-4 h-4 mx-auto" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedProduk(item.nama);
                          setOpenHapus(true);
                        }}
                        className="w-8 h-8 rounded-full border border-red-400 text-red-500 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4 mx-auto" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* DELETE ALERT */}
      <DeleteAlert
        open={openHapus}
        onCancel={() => setOpenHapus(false)}
        onConfirm={() => {
          console.log("Hapus produk:", selectedProduk);
          setOpenHapus(false);
        }}
      />
    </div>
  );
};

export default Produk;