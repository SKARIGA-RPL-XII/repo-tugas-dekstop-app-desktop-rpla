import { useState, useEffect } from "react"
import { Trash2, Pencil, Search, Calendar } from "lucide-react"

import DeleteAlert from "../components/DeleteAlert"
import Pagination from "../components/Pagination"

const Kategori = () => {
  const [openModal, setOpenModal] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openHapus, setOpenHapus] = useState(false)

  const [namaKategori, setNamaKategori] = useState("")
  const [selectedKategori, setSelectedKategori] = useState("")

  const [search, setSearch] = useState("")
  const [filterDate, setFilterDate] = useState("")

  // ================= PAGINATION =================
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 3

  const dataKategori = [
    { id: 1, nama: "Barang", total: "120 Produk", tanggal: "2026-12-12" },
    { id: 2, nama: "Minuman", total: "80 Produk", tanggal: "2026-12-10" },
    { id: 3, nama: "Makanan", total: "50 Produk", tanggal: "2026-12-09" },
    { id: 4, nama: "Snack", total: "40 Produk", tanggal: "2026-12-08" },
    { id: 5, nama: "Frozen", total: "20 Produk", tanggal: "2026-12-07" },
  ]

  // ================= FILTER =================
  const filteredData = dataKategori.filter((item) => {
    const matchSearch = item.nama
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchDate = filterDate ? item.tanggal === filterDate : true

    return matchSearch && matchDate
  })

  // ================= PAGINATION LOGIC =================
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // reset halaman saat filter/search berubah
  useEffect(() => {
    setCurrentPage(1)
  }, [search, filterDate])

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 font-montserrat relative">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Kategori Produk
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Beranda / <span className="text-indigo-600">Kategori Produk</span>
          </p>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
        >
          + Tambah Kategori
        </button>
      </div>

      {/* CARD */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="overflow-x-auto">

          {/* SEARCH & FILTER (TIDAK DIUBAH) */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Telusuri sesuatu..."
                className="h-10 w-64 pl-9 pr-4 border border-gray-200 rounded-md text-sm"
              />
            </div>

            <label className="h-10 flex items-center gap-2 px-4 border border-gray-200 rounded-md text-sm text-gray-500 cursor-pointer">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span>Filter Tanggal Pembuatan</span>
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="absolute opacity-0 pointer-events-none"
              />
            </label>
          </div>

          {/* TABLE */}
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-100 text-gray-600">
                <th className="py-3 px-4 text-left rounded-l-lg">#</th>
                <th className="py-3 px-4 text-left">Nama Kategori</th>
                <th className="py-3 px-4 text-left">Total Produk</th>
                <th className="py-3 px-4 text-left">Dibuat Tanggal</th>
                <th className="py-3 px-4 text-center rounded-r-lg">Aksi</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {paginatedData.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-sm text-gray-400">
                    Data tidak ditemukan
                  </td>
                </tr>
              )}

              {paginatedData.map((item, i) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    {(currentPage - 1) * itemsPerPage + i + 1}
                  </td>
                  <td className="py-3 px-4">{item.nama}</td>
                  <td className="py-3 px-4">{item.total}</td>
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
                        onClick={() => {
                          setSelectedKategori(item.nama)
                          setNamaKategori(item.nama)
                          setOpenEdit(true)
                        }}
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-orange-400 text-orange-500 hover:bg-orange-50"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          setSelectedKategori(item.nama)
                          setOpenHapus(true)
                        }}
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-red-400 text-red-500 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* PAGINATION (STYLE TIDAK DIUBAH) */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {/* modal modalan pokok e */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            onClick={() => setOpenModal(false)}
            className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
          />

          <div className="relative bg-white w-full max-w-xl rounded-lg shadow-lg z-10">
            <div className="flex justify-between items-center px-6 py-3 bg-slate-100 rounded-t-lg">
              <h2 className="text-sm font-medium text-gray-800">
                Tambah Kategori Produk
              </h2>
              <button onClick={() => setOpenModal(false)}>×</button>
            </div>

            <div className="px-6 py-5">
              <label className="text-xs font-medium text-gray-600 block mb-2">
                Nama Kategori<span className="text-red-500">*</span>
              </label>
              <input
                value={namaKategori}
                onChange={(e) => setNamaKategori(e.target.value)}
                className="w-full px-3 py-2 border rounded-md text-sm focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div className="flex justify-end gap-2 px-6 py-3">
              <button
                onClick={() => setOpenModal(false)}
                className="px-4 py-1.5 rounded-md bg-gray-400 text-white"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  console.log("Tambah kategori:", namaKategori)
                  setNamaKategori("")
                  setOpenModal(false)
                }}
                className="px-4 py-1.5 rounded-md bg-indigo-600 text-white"
              >
                Tambah
              </button>
            </div>
          </div>
        </div>
      )}

      {/* modal modalan pisan  */}
      {openEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            onClick={() => setOpenEdit(false)}
            className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
          />

          <div className="relative bg-white w-full max-w-xl rounded-lg shadow-lg z-10">
            <div className="flex justify-between items-center px-6 py-3 bg-slate-100">
              <h2 className="text-sm font-medium text-gray-800">
                Edit Kategori Produk
              </h2>
              <button onClick={() => setOpenEdit(false)}>×</button>
            </div>

            <div className="px-6 py-5">
              <label className="text-xs font-medium text-gray-600 block mb-2">
                Nama Kategori
              </label>
              <input
                value={namaKategori}
                onChange={(e) => setNamaKategori(e.target.value)}
                className="w-full px-3 py-2 border rounded-md text-sm"
              />
            </div>

            <div className="flex justify-end gap-2 px-6 py-3">
              <button
                onClick={() => setOpenEdit(false)}
                className="px-4 py-1.5 rounded-md bg-gray-400 text-white"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  console.log("Edit kategori:", selectedKategori, namaKategori)
                  setOpenEdit(false)
                }}
                className="px-4 py-1.5 rounded-md bg-indigo-600 text-white"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}



      <DeleteAlert
        open={openHapus}
        description={
          <>
            Data <b>"{selectedKategori}"</b> akan dihapus permanen.
          </>
        }
        onCancel={() => setOpenHapus(false)}
        onConfirm={() => setOpenHapus(false)}
      />
    </div>
  )
}

export default Kategori
