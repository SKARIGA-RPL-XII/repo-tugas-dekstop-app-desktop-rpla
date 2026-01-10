import { useState } from "react"

const Kategori = () => {
  const [openModal, setOpenModal] = useState(false)
  const [namaKategori, setNamaKategori] = useState("")
  const [openTambah, setOpenTambah] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [openHapus, setOpenHapus] = useState(false)
    const [selectedKategori, setSelectedKategori] = useState<string>("")


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
          <span className="text-lg">+</span>
          Tambah Kategori
        </button>
      </div>

      {/* CARD */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        {/* TABLE */}
        <div className="overflow-x-auto">
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
              {[1,2,3].map((i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="py-3 px-4">{i}</td>
                  <td className="py-3 px-4">Barang</td>
                  <td className="py-3 px-4">120 Produk</td>
                  <td className="py-3 px-4">12 Desember 2026</td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center gap-2">
                        <button
                        onClick={() => {
                            setSelectedKategori("Barang")
                            setNamaKategori("Barang")
                            setOpenEdit(true)
                        }}
                        className="w-8 h-8 rounded-full border border-orange-400 text-orange-500 hover:bg-orange-50"
                        >
                        ✏️
                        </button>

                        <button
                        onClick={() => {
                            setSelectedKategori("Barang")
                            setOpenHapus(true)
                        }}
                        className="w-8 h-8 rounded-full border border-red-400 text-red-500 hover:bg-red-50"
                        >
                        🗑️
                        </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

     {/* ================= MODAL ================= */}
        {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

            {/* OVERLAY */}
            <div
            onClick={() => setOpenModal(false)}
            className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
            />

            {/* MODAL BOX */}
            <div className="relative bg-white w-full max-w-xl rounded-lg shadow-[0_8px_30px_rgba(0,0,0,0.12)] z-10">

            {/* HEADER */}
            <div className="flex justify-between items-center px-6 py-3 bg-slate-100 rounded-t-lg">
                <h2 className="text-sm font-medium text-gray-800">
                Tambah Kategori Produk
                </h2>
                <button
                onClick={() => setOpenModal(false)}
                className="text-gray-400 hover:text-gray-600 text-lg leading-none"
                >
                ×
                </button>
            </div>

            {/* BODY */}
            <div className="px-6 py-5">
                <label className="text-xs font-medium text-gray-600 block mb-2">
                Nama Kategori<span className="text-red-500">*</span>
                </label>
                <input
                type="text"
                value={namaKategori}
                onChange={(e) => setNamaKategori(e.target.value)}
                placeholder="Masukkan nama kategori untuk produk Anda"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
            </div>

            {/* FOOTER */}
            <div className="flex justify-end gap-2 px-6 py-3 bg-white rounded-b-lg">
            <button
                onClick={() => setOpenModal(false)}
                className="px-4 py-1.5 rounded-md text-sm bg-gray-400 text-white hover:bg-gray-500"
            >
                Batal
            </button>
            <button
                className="px-4 py-1.5 rounded-md text-sm bg-indigo-600 text-white hover:bg-indigo-700"
            >
                Tambah
            </button>
            </div>


            </div>
        </div>
        )}
        {/* =============== END MODAL =============== */}
        {/* =============== edit & delete MODAL =============== */}
        {openEdit && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div
                onClick={() => setOpenEdit(false)}
                className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
                />

                <div className="relative bg-white w-full max-w-xl rounded-lg overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)] z-10">

                {/* HEADER */}
                <div className="flex justify-between items-center px-6 py-3 bg-slate-100">
                    <h2 className="text-sm font-medium text-gray-800">
                    Edit Kategori Produk
                    </h2>
                    <button
                    onClick={() => setOpenEdit(false)}
                    className="text-gray-400 hover:text-gray-600 text-lg"
                    >
                    ×
                    </button>
                </div>

                {/* BODY */}
                <div className="px-6 py-5">
                    <label className="text-xs font-medium text-gray-600 block mb-2">
                    Nama Kategori<span className="text-red-500">*</span>
                    </label>
                    <input
                    type="text"
                    value={namaKategori}
                    onChange={(e) => setNamaKategori(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-indigo-500 outline-none"
                    />
                </div>

                {/* FOOTER */}
                <div className="flex justify-end gap-2 px-6 py-3">
                    <button
                    onClick={() => setOpenEdit(false)}
                    className="px-4 py-1.5 rounded-md text-sm bg-gray-400 text-white hover:bg-gray-500"
                    >
                    Batal
                    </button>
                    <button
                    className="px-4 py-1.5 rounded-md text-sm bg-indigo-600 text-white hover:bg-indigo-700"
                    >
                    Simpan
                    </button>
                </div>

                </div>
            </div>
            )}
            {openHapus && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div
                onClick={() => setOpenHapus(false)}
                className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
                />

                <div className="relative bg-white w-full max-w-md rounded-lg overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)] z-10">

                {/* HEADER */}
                <div className="px-6 py-4 bg-slate-100">
                    <h2 className="text-sm font-medium text-gray-800">
                    Hapus Kategori
                    </h2>
                </div>

                {/* BODY */}
                <div className="px-6 py-5 text-sm text-gray-600">
                    Apakah Anda yakin ingin menghapus kategori
                    <span className="font-medium text-gray-800">
                    {" "}“{selectedKategori}”
                    </span>?
                    <br />
                    Tindakan ini tidak dapat dibatalkan.
                </div>

                {/* FOOTER */}
                <div className="flex justify-end gap-2 px-6 py-3">
                    <button
                    onClick={() => setOpenHapus(false)}
                    className="px-4 py-1.5 rounded-md text-sm bg-gray-300 text-gray-700 hover:bg-gray-400"
                    >
                    Batal
                    </button>
                    <button
                    className="px-4 py-1.5 rounded-md text-sm bg-red-600 text-white hover:bg-red-700"
                    >
                    Hapus
                    </button>
                </div>

                </div>
            </div>
        )}

        {/* =============== END MODAL =============== */}



    </div>
  )
}

export default Kategori
