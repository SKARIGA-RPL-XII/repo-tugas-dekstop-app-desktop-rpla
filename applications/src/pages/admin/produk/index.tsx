import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import {
  Search,
  Layers,
  DollarSign,
  Boxes,
  CheckCircle,
  Calendar,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useCategories } from "../../../hooks/categories/useCategories";


import {
  ContainerHeaderPage,
  HeaderActions,
  HeaderTitle,
} from "../../../components/UI/component-header-page";
import { Button } from "../../../components/UI/Button";
import { Card } from "../../../components/UI/Card";
import { DataTable } from "../../../components/UI/DataTable";
import {
  HeaderTableContainer,
  HeaderTableSearch,
} from "../../../components/UI/header-table";
import DeleteAlert from "../../../components/Modals/DeleteAlert";
import { EmptyNoData, EmptyNoResults } from "../../../components/UI/EmptyState";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "../../../components/UI/AlertDialog";
import { Input } from "../../../components/UI/Input";
import { useToast } from "../../../components/UI/ToastContext";

import { useProducts } from "../../../hooks/products/useProducts";
import { useProductDialog } from "../../../hooks/products/useProductDialog";
import { getUserColumns } from "../../../columns/userColumns";
import { getProductColumns } from "../../../columns/productColumns";


const Produk = () => {
  
  const { addToast } = useToast();

  const [openPrice, setOpenPrice] = useState(false);
  const [openStock, setOpenStock] = useState(false);

  /* ================= KATEGORI ================= */
const {
  data: categories = [],
  loading: categoryLoading,
} = useCategories({
  page: 1,
  limit: 100,
});



const {
  openDelete,
  openDeleteState,
  closeDelete,
  selected,
} = useProductDialog();

const {
  data,
  meta,
  loading,
  filters,
  setFilterField,
  setSearch,
  setFilters,
  deleteProduct,
  refetch,
} = useProducts();


  const isLoading = loading;

  const columns = getProductColumns({
    openDelete,
    isLoading,
  });


  const navigate = useNavigate();


  const handleSubmit = async () => {
    try {
      if (mode === "create") {
        await createProduct(form);
        addToast({
          title: "Berhasil",
          description: "Produk berhasil ditambahkan",
          type: "success",
        });
      }

      if (mode === "edit" && selected) {
        await updateProduct({
          id: selected.id,
          payload: form,
        });

        addToast({
          title: "Berhasil",
          description: "Produk berhasil diperbarui",
          type: "success",
        });
      }

      refetch();
      close();
    } catch (err: any) {
      addToast({
        title: "Gagal",
        description: err.response?.data?.message || "Terjadi kesalahan",
        type: "error",
      });
    }
  };

  const isStockInvalid =
  filters.min_stock !== "" &&
  filters.max_stock !== "" &&
  Number(filters.max_stock) < Number(filters.min_stock);

  const isPriceInvalid =
  filters.min_price !== "" &&
  filters.max_price !== "" &&
  Number(filters.max_price) < Number(filters.min_price);


  const handleDelete = async () => {
    if (!selected?.id) return;

    await deleteProduct(selected.id);

    addToast({
      title: "Berhasil",
      description: "Produk berhasil dihapus",
      type: "success",
    });

    refetch();
    closeDelete();
  };


  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <ContainerHeaderPage className="mb-5">
        <HeaderTitle>Daftar Produk</HeaderTitle>
        <HeaderActions>
          <Button
            onClick={() => navigate("/admin/produk/tambah")}
            className="flex gap-2"
          >
            <Plus size={18} /> Tambah Produk
          </Button>
        </HeaderActions>
      </ContainerHeaderPage>

      <Card>
      <HeaderTableContainer className="flex flex-wrap items-center gap-3 mb-4">

=        <div className="relative">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <HeaderTableSearch
            value={filters.search}
            onChange={setSearch}
            onSearch={setSearch}
            placeholder="Telusuri sesuatu..."
            className="w-72 pl-10 h-10 rounded-full border border-gray-200 text-sm"
          />
        </div>

        <div className="flex items-center gap-2 h-10 px-4 border border-gray-200 rounded-full bg-white text-sm text-gray-600">
          <Layers size={16} className="text-gray-400" />
          <select
            disabled={categoryLoading}
            className="bg-transparent outline-none cursor-pointer"
            value={filters.category_id}
            onChange={(e) => setFilterField("category_id", e.target.value)}
          >
            <option value="">
              {categoryLoading ? "Memuat kategori..." : "Kategori"}
            </option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.category_name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => setOpenPrice(true)}
          className="flex items-center gap-2 h-10 px-4 border border-gray-200 rounded-full text-sm text-gray-600 bg-white hover:bg-gray-50 transition"
        >
          <DollarSign size={16} className="text-gray-400" />
          Range Harga
        </button>

        <button
          onClick={() => setOpenStock(true)}
          className="flex items-center gap-2 h-10 px-4 border border-gray-200 rounded-full text-sm text-gray-600 bg-white hover:bg-gray-50 transition"
        >
          <Boxes size={16} className="text-gray-400" />
          Range Stok
        </button>

        <div className="flex items-center gap-2 h-10 px-4 border border-gray-200 rounded-full bg-white text-sm text-gray-600">
          <CheckCircle size={16} className="text-gray-400" />
          <select
            className="bg-transparent outline-none cursor-pointer"
            value={filters.is_active}
            onChange={(e) => setFilterField("is_active", e.target.value)}
          >
            <option value="">Status</option>
            <option value="true">Aktif</option>
            <option value="false">Non-Aktif</option>
          </select>
        </div>

        <div className="flex items-center gap-2 h-10 px-4 border border-gray-200 rounded-full bg-white text-sm text-gray-600">
          <Calendar size={16} className="text-gray-400" />
          <input
            type="date"
            className="bg-transparent outline-none cursor-pointer"
            value={filters.start_date}
            onChange={(e) => {
              const date = e.target.value;
              setFilterField("start_date", date);
              setFilterField("end_date", date);
            }}
          />
        </div>

      </HeaderTableContainer>

        <DataTable
          columns={columns}
          data={data}
          isLoading={loading}
          page={filters.page}
          pageSize={meta.limit}
          total={meta.count}
          onPageChange={(page) =>
            setFilters((f) => ({ ...f, page }))
          }
        />

        {/* ================= MODAL RANGE HARGA ================= */}
      <AlertDialog open={openPrice} onOpenChange={setOpenPrice}>
        <AlertDialogContent className="rounded-xl">
          <AlertDialogHeader>
            <h2 className="text-base font-semibold text-gray-800">
              Range Harga
            </h2>
            <p className="text-sm text-gray-500">
              Tentukan batas harga minimum dan maksimum
            </p>
          </AlertDialogHeader>

          <div className="grid grid-cols-2 gap-4 mt-5">
            <InputBlock
              label="Minimum"
              type="number"
              value={filters.min_price}
              onChange={(v: string) => setFilterField("min_price", v)}
            />
            <InputBlock
              label="Maksimum"
              type="number"
              value={filters.max_price}
              onChange={(v: string) => setFilterField("max_price", v)}
            />
          </div>

          {isPriceInvalid && (
            <p className="text-sm text-red-500 mt-3">
              Harga maksimum tidak boleh lebih kecil dari minimum
            </p>
          )}

          <AlertDialogFooter className="mt-6 flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setFilterField("min_price", "");
                setFilterField("max_price", "");
                setOpenPrice(false);
                refetch();
              }}
            >
              Batal
            </Button>

            <Button
              disabled={isPriceInvalid}
              className={isPriceInvalid ? "opacity-50 cursor-not-allowed" : ""}
              onClick={() => {
                setOpenPrice(false);
                refetch();
              }}
            >
              Terapkan
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ================= MODAL RANGE STOK ================= */}
      <AlertDialog open={openStock} onOpenChange={setOpenStock}>
        <AlertDialogContent className="rounded-xl">
          <AlertDialogHeader>
            <h2 className="text-base font-semibold text-gray-800">
              Range Stok
            </h2>
            <p className="text-sm text-gray-500">
              Tentukan batas minimum dan maksimum stok
            </p>
          </AlertDialogHeader>

          <div className="grid grid-cols-2 gap-4 mt-5">
            <InputBlock
              label="Minimum"
              type="number"
              value={filters.min_stock}
              onChange={(v: string) => setFilterField("min_stock", v)}
            />
            <InputBlock
              label="Maksimum"
              type="number"
              value={filters.max_stock}
              onChange={(v: string) => setFilterField("max_stock", v)}
            />
          </div>

          {isStockInvalid && (
            <p className="text-sm text-red-500 mt-3">
              Stok maksimum tidak boleh lebih kecil dari minimum
            </p>
          )}

          <AlertDialogFooter className="mt-6 flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setFilterField("min_stock", "");
                setFilterField("max_stock", "");
                setOpenStock(false);
                refetch();
              }}
            >
              Batal
            </Button>

            <Button
              disabled={isStockInvalid}
              className={isStockInvalid ? "opacity-50 cursor-not-allowed" : ""}
              onClick={() => {
                setOpenStock(false);
                refetch();
              }}
            >
              Terapkan
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      </Card>
      <DeleteAlert
        open={openDeleteState}
        onCancel={closeDelete}
        onConfirm={handleDelete}
      />
    </div>
  );
};

const InputBlock = ({ label, value, onChange, type = "text" }: any) => (
  <div>
    <label className="text-sm font-medium text-gray-700 mb-2 block">
      {label}
    </label>
    <Input
      className="h-11"
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export default Produk;
