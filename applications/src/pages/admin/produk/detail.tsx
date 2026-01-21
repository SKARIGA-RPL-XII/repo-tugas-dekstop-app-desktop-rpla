import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductServices } from "../../../services/productService";
import type { Product } from "../../../types/product";
import { Separator } from "../../../components/UI/Separator";
import { ContainerHeaderPage, HeaderTitle } from "../../../components/UI/component-header-page";

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
        console.error(err);
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

  const isActive =
    produk.is_active === true ||
    produk.is_active === "true" ||
    produk.is_active === 1;

  return (
    <div className="bg-gray-50 min-h-screen px-6 py-6">
      <div className="max-w-7xl mx-auto">
         <ContainerHeaderPage className="mb-5">
        <HeaderTitle>Detail Produk</HeaderTitle>
        
      </ContainerHeaderPage>

        {/* CARD */}
        <div className="bg-white rounded-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* IMAGE */}
            <div className="flex justify-center">
              {produk.url_image ? (
                <img
                  src={produk.url_image}
                  alt={produk.product_name}
                  className="w-80 object-contain"
                />
              ) : (
                <div className="w-40 h-40 bg-gray-100 flex items-center justify-center text-gray-400 rounded">
                  No Image
                </div>
              )}
            </div>

            {/* INFO */}
            <div className="md:col-span-2">
              <h2 className="text-lg font-semibold text-gray-800">
                {produk.product_name}
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                {produk.product_code ?? "-"} &nbsp;•&nbsp;{" "}
                {produk.categories?.category_name ?? "-"}
              </p>


              <Separator className="my-4" />

              {/* DESKRIPSI */}
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-1">
                  Deskripsi Produk:
                </p>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {produk.description || "-"}
                </p>
              </div>

              {/* TANGGAL */}
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-1">
                  Tanggal Pembuatan:
                </p>
                <p className="text-sm text-gray-500">
                  {produk.created_at
                    ? new Date(produk.created_at).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })
                    : "-"}
                </p>
              </div>

              {/* STATUS */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">
                  Status Produk:
                </p>
                <p
                  className={`text-sm font-medium ${
                    isActive ? "text-emerald-600" : "text-red-500"
                  }`}
                >
                  {isActive ? "Aktif" : "Non-Aktif"}
                </p>
              </div>
            </div>
          </div>

          {/* FOOTER BUTTON */}
          <div className="flex justify-end mt-6">
            <button
              onClick={() => navigate(-1)}
              className="px-5 py-2 bg-gray-400 text-white rounded-md text-sm hover:bg-gray-500"
            >
              Kembali
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProdukDetail;
