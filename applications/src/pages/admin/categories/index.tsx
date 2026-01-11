import {
  ContainerHeaderPage,
  HeaderActions,
  HeaderTitle,
} from "../../../components/UI/component-header-page";
import { Button } from "../../../components/UI/Button";
import { Plus } from "lucide-react";
import { Card } from "../../../components/UI/Card";
import { DataTable } from "../../../components/UI/DataTable";
import {
  HeaderTableContainer,
  HeaderTableSearch,
} from "../../../components/UI/header-table";
import DeleteAlert from "../../../components/Modals/DeleteAlert";
import { EmptyNoData, EmptyNoResults } from "../../../components/UI/EmptyState";
import { useCategories } from "../../../hooks/categories/useCategories";
import { useCategoryDialog } from "../../../hooks/categories/useCategoryDialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "../../../components/UI/AlertDialog";
import { Input } from "../../../components/UI/Input";
import { getCategoryColumns } from "../../../columns/categoryColumns";
import { useToast } from "../../../components/UI/ToastContext";

const Category = () => {
  const {
    open,
    openDeleteState,
    selected,
    mode,
    form,
    setFormField,
    errors,
    setErrors,
    openCreate,
    openEdit,
    close,
    openDelete,
    closeDelete,
    filters,
    setSearch,
  } = useCategoryDialog();

  const {
    data,
    meta,
    filters: categoryFilters,
    setFilters: setCategoryFilters,
    loading,
    refetch,
    createCategory,
    createLoading,
    updateCategory,
    updateLoading,
    deleteCategory,
    deleteLoading,
  } = useCategories({
    page: filters.page,
    limit: filters.limit,
    search: filters.search,
  });
  const { addToast } = useToast();

  const isLoading = loading || createLoading || updateLoading || deleteLoading;
  const columns = getCategoryColumns({ openEdit, openDelete, isLoading });

  const handleSubmit = async () => {
    const handleError = (err) => {
      let message = "Something went wrong";
      if (Array.isArray(err.response?.data?.message)) {
        const fieldErrors: Record<string, string> = {};
        err.response.data.message.forEach((e) => {
          fieldErrors[e.path] = e.message;
        });
        setErrors(fieldErrors);
        message = err.response.data.message
          .map((e) => `${e.path}: ${e.message}`)
          .join(", ");
      } else if (typeof err.response?.data?.message === "string") {
        setErrors({ category_name: err.response.data.message });
        message = err.response.data.message;
      }

      addToast({
        title: "Failed",
        description: message,
        type: "error",
      });
    };

    try {
      if (mode === "create") {
        const res = await createCategory(form);
        addToast({
          title: "Category created successfully",
          description: `Category "${form.category_name}" has been added.`,
          type: "success",
        });
      } else if (mode === "edit" && selected) {
        await updateCategory({ id: selected.id, payload: form });
        addToast({
          title: "Category updated successfully",
          description: `Category "${form.category_name}" has been updated.`,
          type: "success",
        });
      }
      close();
    } catch (err) {
      handleError(err);
    }
  };

  const handleDelete = async () => {
    if (!selected) return;

    try {
      await deleteCategory(selected.id);
      addToast({
        title: "Category deleted successfully",
        description: `Category "${selected.category_name}" has been deleted.`,
        type: "success",
      });
      closeDelete();
    } catch (err) {
      addToast({
        title: "Failed to delete category",
        description: err.response?.data?.message || "Something went wrong",
        type: "error",
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 relative">
      <ContainerHeaderPage className="mb-5">
        <HeaderTitle>Kategori Produk</HeaderTitle>
        <HeaderActions>
          <Button
            className="flex items-center gap-2"
            onClick={openCreate}
            disabled={isLoading}
          >
            <Plus /> Tambah Kategori
          </Button>
        </HeaderActions>
      </ContainerHeaderPage>

      <Card>
        <HeaderTableContainer>
          <HeaderTableSearch
            value={filters.search}
            onChange={(val) => {
              setSearch(val);
            }}
            onSearch={(val) => {
              setCategoryFilters({ ...categoryFilters, page: 1, search: val });
            }}
            placeholder="Cari kategori..."
          />
        </HeaderTableContainer>

        <DataTable
          columns={columns}
          data={data}
          isLoading={isLoading}
          loadingSkeletonRows={5}
          noDataComponent={<EmptyNoData onRefresh={refetch} />}
          noResultsComponent={<EmptyNoResults onRefresh={refetch} />}
          page={categoryFilters.page}
          pageSize={meta.limit}
          total={meta.count}
          onPageChange={(newPage) =>
            setCategoryFilters({ ...categoryFilters, page: newPage })
          }
        />
      </Card>

      <AlertDialog open={open} onOpenChange={close}>
        <AlertDialogHeader onClose={close}>
          {mode === "create" ? "Tambah Kategori" : "Edit Kategori"}
        </AlertDialogHeader>

        <AlertDialogContent className="pb-0">
          <label className="text-xs font-medium text-gray-600 block mb-3">
            Nama Kategori <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            placeholder="Masukkan nama kategori"
            value={form.category_name}
            variant={errors.category_name ? "error" : "default"}
            onChange={(e) => setFormField("category_name", e.target.value)}
            disabled={isLoading}
          />
          {errors.category_name && (
            <p className="text-xs text-red-500 mt-1">{errors.category_name}</p>
          )}

          <AlertDialogFooter>
            <Button variant="outline" onClick={close} disabled={isLoading}>
              Batal
            </Button>
            <Button onClick={handleSubmit} disabled={isLoading}>
              {isLoading
                ? "Loading..."
                : mode === "create"
                ? "Tambah"
                : "Update"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DeleteAlert
        open={openDeleteState}
        onCancel={closeDelete}
        onConfirm={handleDelete}
        isLoading={deleteLoading}
      />
    </div>
  );
};

export default Category;
