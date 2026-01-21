import { useEffect } from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";


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

  const {
    openDelete,
    openDeleteState,
    closeDelete,
    selected,
    setSearch,
    filters,
  } = useProductDialog();


  const {
    data,
    meta,
    loading,
    filters: productFilters,
    setFilters: setProductFilters,
    createProduct,
    updateProduct,
    deleteProduct,
    refetch,
  } = useProducts({
    page: filters.page,
    limit: filters.limit,
    search: filters.search,
  });

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
        <HeaderTableContainer>
          <HeaderTableSearch
            placeholder="Telusuri produk..."
            value={filters.search}
            onChange={(val) => setSearch(val)}
            onSearch={(val) =>
              setProductFilters({ ...productFilters, page: 1, search: val })
            }
          />
        </HeaderTableContainer>

        <DataTable
          columns={columns}
          data={data}
          isLoading={isLoading}
          loadingSkeletonRows={6}
          noDataComponent={<EmptyNoData onRefresh={refetch} />}
          noResultsComponent={<EmptyNoResults onRefresh={refetch} />}
          page={productFilters.page}
          pageSize={meta.limit}
          total={meta.count}
          onPageChange={(page) =>
            setProductFilters({ ...productFilters, page })
          }
        />
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
