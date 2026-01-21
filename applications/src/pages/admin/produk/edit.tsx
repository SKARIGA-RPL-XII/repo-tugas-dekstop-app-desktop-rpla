import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductServices } from "../../../services/productService";
import { useToast } from "../../../components/UI/ToastContext";
import { useCategories } from "../../../hooks/categories/useCategories";

const ProdukEdit = () => {
  const { addToast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);

  const { data: categories = [], loading: categoryLoading } = useCategories({
    page: 1,
    limit: 100,
  });

  const [form, setForm] = useState({
    nama: "",
    kode: "",
    kategori: "",
    status: true,
    harga: "",
    stok: "",
    deskripsi: "",
    gambar: null as File | null,
    imageUrl: "",
  });

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);

        const product = await ProductServices.getProductById(id);

        const isActive =
          product.is_active === true ||
          product.is_active === "true" ||
          product.is_active === 1;

        setForm({
          nama: product.product_name ?? "",
          kode: product.product_code ?? "",
          kategori: product.category_id ?? "",
          status: isActive, 
          harga: product.price?.toString() ?? "",
          stok: product.stock?.toString() ?? "",
          deskripsi: product.description ?? "",
          gambar: null,
          imageUrl: product.url_image ?? "",
        });
      } catch (error) {
        console.error(error);
        alert("Gagal memuat data produk");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const formatNumber = (value: string) =>
    value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  const unformatNumber = (value: string) =>
    value.replace(/\./g, "");


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


  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm((prev) => ({
      ...prev,
      status: e.target.value === "true",
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setForm((prev) => ({
      ...prev,
      gambar: file,
      imageUrl: URL.createObjectURL(file),
    }));
  };

  const validateForm = () => {
  if (!form.nama.trim()) {
    addToast({
      title: "Validasi gagal",
      description: "Nama produk wajib diisi",
      type: "error",
    });
    return false;
  }

  if (!form.kategori) {
    addToast({
      title: "Validasi gagal",
      description: "Kategori wajib dipilih",
      type: "error",
    });
    return false;
  }

  if (!form.harga || Number(form.harga) <= 0) {
    addToast({
      title: "Validasi gagal",
      description: "Harga harus lebih dari 0",
      type: "error",
    });
    return false;
  }

  if (!form.stok || Number(form.stok) < 0) {
    addToast({
      title: "Validasi gagal",
      description: "Stok tidak boleh kosong",
      type: "error",
    });
    return false;
  }

  return true;
};


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validateForm()) return;

  try {
    setLoading(true);

    const payload = new FormData();
    payload.append("product_name", form.nama);
    payload.append("price", unformatNumber(form.harga));
    payload.append("stock", unformatNumber(form.stok));
    payload.append("category_id", form.kategori);
    payload.append("description", form.deskripsi);
    payload.append("is_active", String(form.status));

    if (form.gambar) {
      payload.append("image", form.gambar);
    }

    await ProductServices.updateProduct(id!, payload);

    addToast({
      title: "Berhasil",
      description: "Produk berhasil diperbarui",
      type: "success",
    });
    location.href = "/admin/produk";
    setTimeout(() => {
      window.location.reload();
    }, 1000);

  } catch (err: any) {
    addToast({
      title: "Gagal",
      description:
        err.response?.data?.message || "Gagal mengubah produk",
      type: "error",
    });
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-800">Edit Produk</h1>
        <p className="text-sm text-gray-400 mt-1">
          Beranda / Daftar Produk /{" "}
          <span className="text-indigo-600">Edit Produk</span>
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

            <Input label="Kode Produk" value={form.kode} disabled />

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
              name="harga"
              value={form.harga}
              onChange={handleHargaChange}
              required
            />

            <Input
              label="Stok"
              name="stok"
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

        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <label
            htmlFor="upload-image"
            className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg
            flex items-center justify-center cursor-pointer text-gray-400
            hover:border-indigo-400 hover:text-indigo-500 transition"
          >
            <span>
              {form.imageUrl && (
              <img
                src={form.imageUrl}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-md mb-4 mt-4"
                />
              )}
            </span>            
          </label>
          <span className="text-xs text-gray-400 text-center">
            Ganti Gambar
          </span>
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
            {loading ? "Menyimpan..." : "Simpan Perubahan"}
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
        type="text"          // ✅ GANTI INI
        inputMode="numeric"  // ✅ SUPAYA NUMPAD
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

export default ProdukEdit;
