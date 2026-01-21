import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductServices } from "../../../services/productService";
import { useCategories } from "../../../hooks/categories/useCategories";

const ProdukTambah = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  /* ================== KATEGORI ================== */
  const { data: categories = [], loading: categoryLoading } = useCategories({
    page: 1,
    limit: 100,
  });

  /* ================== FORM STATE ================== */
  const [form, setForm] = useState({
    nama: "",
    kategori: "",
    status: true,
    harga: "",
    stok: "",
    deskripsi: "",
    gambar: null as File | null,
    imageUrl: "",
  });

  /* ================== FORMAT ANGKA ================== */
  const formatNumber = (value: string) => {
    const clean = value.replace(/\D/g, "");
    return clean.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const unformatNumber = (value: string) => {
    return value.replace(/\./g, "");
  };

  const handleHargaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      harga: formatNumber(e.target.value),
    }));
  };

  const handleStokChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      stok: formatNumber(e.target.value),
    }));
  };

  /* ================== HANDLERS ================== */
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm((prev) => ({
      ...prev,
      status: e.target.value === "true",
    }));
  };

  const MAX_SIZE = 2 * 1024 * 1024; // 2MB
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_SIZE) {
      alert("Ukuran gambar maksimal 2MB");
      e.target.value = "";
      return;
    }

    setForm((prev) => ({
      ...prev,
      gambar: file,
      imageUrl: URL.createObjectURL(file),
    }));
  };

  /* ================== SUBMIT ================== */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.gambar) {
      alert("Gambar produk wajib diunggah");
      return;
    }

    try {
      setLoading(true);

      const payload = new FormData();
      payload.append("product_name", form.nama);
      payload.append("price", unformatNumber(form.harga)); // ✅ FIX
      payload.append("stock", unformatNumber(form.stok)); // ✅ FIX
      payload.append("category_id", form.kategori);
      payload.append("description", form.deskripsi);
      payload.append("is_active", String(form.status));
      payload.append("image", form.gambar);

      await ProductServices.createProduct(payload);
      navigate("/admin/produk");
    } catch (err: any) {
      alert(err.response?.data?.message || "Gagal menambahkan produk");
    } finally {
      setLoading(false);
    }
  };

  /* ================== RENDER ================== */
  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-800">Tambah Produk</h1>
        <p className="text-sm text-gray-400 mt-1">
          Beranda / Daftar Produk /{" "}
          <span className="text-indigo-600">Tambah Produk</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Nama Produk"
              name="nama"
              value={form.nama}
              onChange={handleChange}
              required
            />

            <Input label="Kode Produk" value="Otomatis dari sistem" disabled />

            <div>
              <Label>Kategori<span className="text-red-500">*</span></Label>
              <select
                name="kategori"
                value={form.kategori}
                onChange={handleChange}
                disabled={categoryLoading}
                className="mt-2 w-full h-10 px-4 border border-gray-200 rounded-md text-sm"
                required
              >
                <option value="">Pilih kategori</option>
                {categories.map((c: any) => (
                  // 🔴 jika data kamu pakai category_id → ganti c.id jadi c.category_id
                  <option key={c.id} value={c.id}>
                    {c.category_name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label>Status<span className="text-red-500">*</span></Label>
              <select
                value={String(form.status)}
                onChange={handleStatusChange}
                className="mt-2 w-full h-10 px-4 border border-gray-200 rounded-md text-sm"
              >
                <option value="true">Aktif</option>
                <option value="false">Non-Aktif</option>
              </select>
            </div>

            <PriceInput
              label="Harga"
              value={form.harga}
              onChange={handleHargaChange}
              required
            />

            <Input
              label="Stok"
              value={form.stok}
              onChange={handleStokChange}
              required
            />
          </div>

          <Textarea
            label="Deskripsi"
            name="deskripsi"
            value={form.deskripsi}
            onChange={handleChange}
            required
          />
        </div>

        <div className="w-250 h-50 bg-white rounded-xl border border-gray-100 p-6">


          <label
            htmlFor="upload-image"
            className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg
            flex items-center justify-center cursor-pointer text-gray-400"
          >
            <span className="text-xs">
              {form.imageUrl && (
                <img
                  src={form.imageUrl}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-md mt-8 mb-4"
                />
              )}
              {form.gambar ? "Gambar Dipilih" : "Unggah Gambar"}
            </span>
          </label>

          <input
            id="upload-image"
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageChange}
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-5 py-2 rounded-md bg-gray-400 text-white text-sm"
          >
            Kembali
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 rounded-md bg-indigo-600 text-white text-sm"
          >
            {loading ? "Menyimpan..." : "Tambah"}
          </button>
        </div>
      </form>
    </div>
  );
};

/* ================= SMALL COMPONENTS ================= */

const Label = ({ children }: any) => (
  <label className="text-xs font-medium text-gray-700">{children}</label>
);

const Input = ({ label, required, ...props }: any) => (
  <div>
    <Label>
      {label}
      {required && <span className="text-red-500">*</span>}
    </Label>
    <input
      {...props}
      className="mt-2 w-full h-10 px-4 border border-gray-200 rounded-md text-sm"
    />
  </div>
);

const PriceInput = ({ label, required, ...props }: any) => (
  <div>
    <Label>
      {label}
      {required && <span className="text-red-500">*</span>}
    </Label>
    <div className="mt-2 flex items-center border border-gray-200 rounded-md">
      <span className="px-4 text-sm text-gray-500">Rp</span>
      <input
        {...props}
        type="text"          // ✅ WAJIB
        inputMode="numeric"  // ✅ mobile-friendly
        className="flex-1 h-10 pr-4 text-sm outline-none"
      />
    </div>
  </div>
);

const Textarea = ({ label, required, ...props }: any) => (
  <div className="mt-6">
    <Label>
      {label}
      {required && <span className="text-red-500">*</span>}
    </Label>
    <textarea
      {...props}
      rows={4}
      className="mt-2 w-full px-4 py-3 border border-gray-200 rounded-md text-sm"
    />
  </div>
);

export default ProdukTambah;
