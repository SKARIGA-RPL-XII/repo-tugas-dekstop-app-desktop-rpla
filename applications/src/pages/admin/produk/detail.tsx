import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductServices } from "../../../services/productService";
import type { Product } from "../../../types/product";

const ProdukDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [produk, setProduk] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await ProductServices.getProductById(id);
        setProduk(data);
      } catch (err) {
        setError("Gagal memuat data produk");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Memuat data produk...
      </div>
    );
  }

  if (error || !produk) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-red-500 mb-4">
          {error || "Produk tidak ditemukan"}
        </p>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-400 text-white rounded-md"
        >
          Kembali
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 font-montserrat">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Detail Produk
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Beranda / Daftar Produk /{" "}
          <span className="text-indigo-600">Detail Produk</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* GAMBAR (PLACEHOLDER) */}
        <div className="bg-white rounded-2xl shadow-sm p-6 flex justify-center items-center">
          <div className="w-48 h-48 bg-gray-100 flex items-center justify-center text-gray-400 rounded-lg">
            No Image
          </div>
        </div>

        {/* INFORMASI */}
        <div className="md:col-span-2 bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-1">
            {produk.name}
          </h2>

          <p className="text-sm text-gray-500 mb-4">
            {produk.code ?? "-"} • {produk.category_name ?? "-"}
          </p>

          <hr className="mb-4" />

          {/* HARGA & STOK */}
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-1">
                Harga:
              </h3>
              <p className="text-sm text-gray-500">
                Rp {produk.price.toLocaleString("id-ID")}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-1">
                Stok:
              </h3>
              <p className="text-sm text-gray-500">{produk.stock}</p>
            </div>
          </div>

          {/* TANGGAL */}
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-1">
              Tanggal Dibuat:
            </h3>
            <p className="text-sm text-gray-500">
              {new Date(produk.created_at).toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

          {/* STATUS */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-1">
              Status Produk:
            </h3>
            <span
              className={`inline-block px-3 py-1 rounded-md text-xs font-medium ${
                produk.is_active
                  ? "bg-emerald-100 text-emerald-600"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {produk.is_active ? "Aktif" : "Nonaktif"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 rounded-md bg-gray-400 text-white text-sm hover:bg-gray-500"
        >
          Kembali
        </button>
      </div>
    </div>
  );
};

export default ProdukDetail;
