import { useNavigate, useParams } from "react-router-dom";

const ProdukDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // DUMMY DATA (sementara)
  const produk = {
    id,
    nama: "Kripik Talas Keju Labubu",
    kode: "PR 001",
    kategori: "Snack",
    deskripsi:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in mi nisl. Ut posuere nunc orci, sit amet varius eros vulputate nec. Nullam augue urna, cursus sit amet luctus vitae.",
    tanggal: "2026-01-12",
    status: "Aktif",
    gambar:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Piattos_Snack.jpg/480px-Piattos_Snack.jpg",
  };

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

      {/* CONTENT */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* GAMBAR */}
        <div className="bg-white rounded-2xl shadow-sm p-6 flex justify-center items-center">
          <img
            src={produk.gambar}
            alt={produk.nama}
            className="max-h-64 object-contain"
          />
        </div>

        {/* INFORMASI */}
        <div className="md:col-span-2 bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-1">
            {produk.nama}
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            {produk.kode} • {produk.kategori}
          </p>

          <hr className="mb-4" />

          {/* DESKRIPSI */}
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-1">
              Deskripsi Produk:
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              {produk.deskripsi}
            </p>
          </div>

          {/* TANGGAL */}
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-1">
              Tanggal Pembuatan:
            </h3>
            <p className="text-sm text-gray-500">
              {new Date(produk.tanggal).toLocaleDateString("id-ID", {
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
                produk.status === "Aktif"
                  ? "bg-emerald-100 text-emerald-600"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {produk.status}
            </span>
          </div>
        </div>
      </div>

      {/* ACTION */}
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