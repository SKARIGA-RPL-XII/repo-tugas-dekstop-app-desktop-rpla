import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductServices } from "../../../services/productService";
import { useCategories } from "../../../hooks/categories/useCategories";

const ProdukTambah = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  /* ================== KATEGORI (PERUBAHAN SATU-SATUNYA) ================== */
  const { data: categories, loading: categoryLoading } = useCategories({
    page: 1,
    limit: 100,
  });
  /* ====================================================================== */

  const generateProductCode = () => {
    const lastNumber = Number(localStorage.getItem("lastProductCode") || "0") + 1;
    localStorage.setItem("lastProductCode", String(lastNumber));

    return `PROD${String(lastNumber).padStart(3, "0")}`;
  };


  const [form, setForm] = useState({
    nama: "",
    kode: generateProductCode(), // 🔥 auto generate
    kategori: "",
    status: "",
    harga: "",
    stok: "",
    deskripsi: "",
    gambar: null as File | null,
  });


  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setForm((p) => ({ ...p, gambar: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = new FormData();
      payload.append("product_name", form.nama);
      payload.append("product_code", form.kode);
      payload.append("price", form.harga);
      payload.append("stock", form.stok);
      payload.append("category_id", form.kategori);
      payload.append("description", form.deskripsi);
      payload.append(
        "is_active",
        form.status === "Aktif" ? "true" : "false"
      );

      if (form.gambar) payload.append("image", form.gambar);

      await ProductServices.createProduct(payload as any);
      navigate("/admin/produk");
    } catch (err: any) {
      alert(err.response?.data?.message || "Gagal menambahkan produk");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-800">Tambah Produk</h1>
        <p className="text-sm text-gray-400 mt-1">
          Beranda / Daftar Produk /{" "}
          <span className="text-indigo-600">Tambah Produk</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* INFORMASI PRODUK */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-1">
            Informasi Produk
          </h2>
          <p className="text-xs text-gray-400 mb-6">
            Tambahkan informasi mengenai produk yang ingin Anda buat.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Nama Produk"
              name="nama"
              value={form.nama}
              onChange={handleChange}
              placeholder="Masukkan nama produk"
              required
            />

            <Input
              label="Kode Produk"
              name="kode"
              value={form.kode}
              disabled
              required
            />

            {/* ================== KATEGORI (DINAMIS) ================== */}
            <div>
              <Label>
                Kategori<span className="text-red-500">*</span>
              </Label>
              <select
                name="kategori"
                value={form.kategori}
                onChange={handleChange}
                disabled={categoryLoading}
                className="mt-2 w-full h-10 px-4 border border-gray-200 rounded-md text-sm outline-none focus:ring-1 focus:ring-indigo-500"
                required
              >
                <option value="">Pilih kategori produk</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.category_name}
                  </option>
                ))}
              </select>
            </div>
            {/* ========================================================= */}

            <Select
              label="Status"
              name="status"
              value={form.status}
              onChange={handleChange}
              required
              options={[
                { value: "", label: "Pilih status produk" },
                { value: "Aktif", label: "Aktif" },
                { value: "Tidak Aktif", label: "Tidak Aktif" },
              ]}
            />

            <PriceInput
              label="Harga"
              name="harga"
              value={form.harga}
              onChange={handleChange}
              required
            />

            <Input
              label="Stok"
              name="stok"
              value={form.stok}
              onChange={handleChange}
              placeholder="Masukkan stok produk"
              required
            />
          </div>

          <Textarea
            label="Masukkan Deskripsi"
            name="deskripsi"
            value={form.deskripsi}
            onChange={handleChange}
            placeholder="Masukkan deskripsi produk yang Anda buat"
            required
          />
        </div>

        {/* GAMBAR */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-1">
            Gambar Produk
          </h2>
          <p className="text-xs text-gray-400 mb-6">
            Tambahkan gambar produk Anda.
          </p>

          <label className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer text-gray-400 hover:border-indigo-400 hover:text-indigo-500 transition">
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
            <span className="text-xs">Unggah Gambar</span>
          </label>
        </div>

        {/* ACTION */}
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
  <label className="text-xs font-medium text-gray-700">
    {children}
  </label>
);

const Input = ({ label, required, ...props }: any) => (
  <div>
    <Label>
      {label}
      {required && <span className="text-red-500">*</span>}
    </Label>
    <input
      {...props}
      className="mt-2 w-full h-10 px-4 border border-gray-200 rounded-md text-sm outline-none focus:ring-1 focus:ring-indigo-500"
    />
  </div>
);

const Select = ({ label, options, required, ...props }: any) => (
  <div>
    <Label>
      {label}
      {required && <span className="text-red-500">*</span>}
    </Label>
    <select
      {...props}
      className="mt-2 w-full h-10 px-4 border border-gray-200 rounded-md text-sm outline-none focus:ring-1 focus:ring-indigo-500"
    >
      {options.map((o: any) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
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
        type="number"
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
      className="mt-2 w-full px-4 py-3 border border-gray-200 rounded-md text-sm outline-none focus:ring-1 focus:ring-indigo-500"
    />
  </div>
);

export default ProdukTambah;
