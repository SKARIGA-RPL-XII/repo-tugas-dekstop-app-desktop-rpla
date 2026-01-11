import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProdukTambah = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nama: "",
    kode: "PR001",
    kategori: "",
    status: "",
    harga: "",
    stok: "",
    deskripsi: "",
    gambar: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setForm((prev) => ({
      ...prev,
      gambar: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("DATA PRODUK:", form);

    // nanti di sini tinggal fetch ke API createProduct
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 font-montserrat">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Tambah Produk
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Beranda / Daftar Produk /{" "}
          <span className="text-indigo-600">Tambah Produk</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* INFORMASI PRODUK */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="font-semibold text-gray-800 mb-1">
            Informasi Produk
          </h2>
          <p className="text-sm text-gray-400 mb-6">
            Tambahkan informasi mengenai produk yang ingin Anda buat.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nama Produk */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Nama Produk<span className="text-red-500">*</span>
              </label>
              <input
                name="nama"
                value={form.nama}
                onChange={handleChange}
                placeholder="Masukkan nama produk"
                className="mt-2 w-full h-10 px-4 border border-gray-200 rounded-md text-sm outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {/* Kode Produk */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Kode Produk<span className="text-red-500">*</span>
              </label>
              <input
                name="kode"
                value={form.kode}
                disabled
                className="mt-2 w-full h-10 px-4 border border-gray-200 rounded-md text-sm bg-gray-100"
              />
            </div>

            {/* Kategori */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Kategori<span className="text-red-500">*</span>
              </label>
              <select
                name="kategori"
                value={form.kategori}
                onChange={handleChange}
                className="mt-2 w-full h-10 px-4 border border-gray-200 rounded-md text-sm outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="">Pilih kategori produk</option>
                <option value="Snack">Snack</option>
                <option value="Minuman">Minuman</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Status<span className="text-red-500">*</span>
              </label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="mt-2 w-full h-10 px-4 border border-gray-200 rounded-md text-sm outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="">Pilih status produk</option>
                <option value="Aktif">Aktif</option>
                <option value="Tidak Aktif">Tidak Aktif</option>
              </select>
            </div>

            {/* Harga */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Harga<span className="text-red-500">*</span>
              </label>
              <div className="mt-2 flex items-center border border-gray-200 rounded-md">
                <span className="px-4 text-sm text-gray-500">Rp</span>
                <input
                  name="harga"
                  value={form.harga}
                  onChange={handleChange}
                  type="number"
                  placeholder="0"
                  className="flex-1 h-10 pr-4 text-sm outline-none"
                />
              </div>
            </div>

            {/* Stok */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Stok<span className="text-red-500">*</span>
              </label>
              <input
                name="stok"
                value={form.stok}
                onChange={handleChange}
                type="number"
                placeholder="Masukkan stok produk"
                className="mt-2 w-full h-10 px-4 border border-gray-200 rounded-md text-sm outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Deskripsi */}
          <div className="mt-6">
            <label className="text-sm font-medium text-gray-700">
              Masukkan Deskripsi<span className="text-red-500">*</span>
            </label>
            <textarea
              name="deskripsi"
              value={form.deskripsi}
              onChange={handleChange}
              placeholder="Masukkan deskripsi produk yang Anda buat"
              rows={4}
              className="mt-2 w-full px-4 py-3 border border-gray-200 rounded-md text-sm outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* GAMBAR PRODUK */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="font-semibold text-gray-800 mb-1">
            Gambar Produk
          </h2>
          <p className="text-sm text-gray-400 mb-6">
            Tambahkan gambar produk Anda.
          </p>

          <label className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer text-gray-400 hover:border-indigo-400 hover:text-indigo-500 transition">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <span className="text-sm">Unggah Gambar</span>
          </label>
        </div>

        {/* ACTION BUTTON */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-2 rounded-md bg-gray-400 text-white text-sm hover:bg-gray-500"
          >
            Kembali
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700"
          >
            Tambah
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProdukTambah;