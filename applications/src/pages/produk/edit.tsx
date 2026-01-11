import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProdukEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    nama: "",
    kode: "",
    kategori: "",
    status: "",
    harga: "",
    stok: "",
    deskripsi: "",
    gambar: null,
  });

  const [preview, setPreview] = useState(null);

  // ================== DUMMY LOAD DATA ==================
  useEffect(() => {
    // simulasi ambil data produk
    setTimeout(() => {
      setForm({
        nama: "Snack Piattos",
        kode: "PR001",
        kategori: "Snack",
        status: "Aktif",
        harga: 10000,
        stok: 120,
        deskripsi: "Snack ringan dengan rasa keju",
        gambar: null,
      });

      // gambar lama (dummy)
      setPreview("https://via.placeholder.com/300x300.png?text=Produk");

      setLoading(false);
    }, 500);
  }, [id]);

  // ================== HANDLE INPUT ==================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setForm((prev) => ({
      ...prev,
      gambar: file,
    }));

    setPreview(URL.createObjectURL(file));
  };

  // ================== SUBMIT ==================
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("DATA EDIT PRODUK:", form);
    navigate("/admin/produk");
  };

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-400">
        Memuat data produk...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 font-montserrat">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Edit Produk
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Beranda / Daftar Produk /{" "}
          <span className="text-indigo-600">Edit Produk</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* INFORMASI PRODUK */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="font-semibold text-gray-800 mb-1">
            Informasi Produk
          </h2>
          <p className="text-sm text-gray-400 mb-6">
            Ubah informasi produk yang dipilih.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nama */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Nama Produk
              </label>
              <input
                name="nama"
                value={form.nama}
                onChange={handleChange}
                className="mt-2 w-full h-10 px-4 border border-gray-200 rounded-md text-sm"
              />
            </div>

            {/* Kode */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Kode Produk
              </label>
              <input
                value={form.kode}
                disabled
                className="mt-2 w-full h-10 px-4 border border-gray-200 rounded-md text-sm bg-gray-100"
              />
            </div>

            {/* Kategori */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Kategori
              </label>
              <select
                name="kategori"
                value={form.kategori}
                onChange={handleChange}
                className="mt-2 w-full h-10 px-4 border border-gray-200 rounded-md text-sm"
              >
                <option value="">Pilih kategori</option>
                <option value="Snack">Snack</option>
                <option value="Minuman">Minuman</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="mt-2 w-full h-10 px-4 border border-gray-200 rounded-md text-sm"
              >
                <option value="Aktif">Aktif</option>
                <option value="Tidak Aktif">Tidak Aktif</option>
              </select>
            </div>

            {/* Harga */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Harga
              </label>
              <input
                type="number"
                name="harga"
                value={form.harga}
                onChange={handleChange}
                className="mt-2 w-full h-10 px-4 border border-gray-200 rounded-md text-sm"
              />
            </div>

            {/* Stok */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Stok
              </label>
              <input
                type="number"
                name="stok"
                value={form.stok}
                onChange={handleChange}
                className="mt-2 w-full h-10 px-4 border border-gray-200 rounded-md text-sm"
              />
            </div>
          </div>

          {/* Deskripsi */}
          <div className="mt-6">
            <label className="text-sm font-medium text-gray-700">
              Deskripsi
            </label>
            <textarea
              name="deskripsi"
              value={form.deskripsi}
              onChange={handleChange}
              rows={4}
              className="mt-2 w-full px-4 py-3 border border-gray-200 rounded-md text-sm"
            />
          </div>
        </div>

        {/* GAMBAR PRODUK */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="font-semibold text-gray-800 mb-1">
            Gambar Produk
          </h2>
          <p className="text-sm text-gray-400 mb-6">
            Ubah gambar produk jika diperlukan.
          </p>

          <div className="flex items-center gap-6">
            {/* PREVIEW */}
            <div className="w-32 h-32 border rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xs text-gray-400">No Image</span>
              )}
            </div>

            {/* UPLOAD */}
            <label className="px-4 py-2 border border-dashed border-gray-300 rounded-md cursor-pointer text-sm text-gray-600 hover:border-indigo-500 hover:text-indigo-600 transition">
              Ganti Gambar
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* ACTION */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-2 rounded-md bg-gray-400 text-white text-sm"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded-md bg-indigo-600 text-white text-sm"
          >
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProdukEdit;
