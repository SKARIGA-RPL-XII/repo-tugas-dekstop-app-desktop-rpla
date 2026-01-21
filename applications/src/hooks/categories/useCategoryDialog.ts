import { useState } from "react";
import {
  CategoryData,
  CategoryForm,
  CategoryFormErrors,
  GetCategoriesParams,
} from "../../types/category";
import { ApiError } from "../../types/Api";

export function useCategoryDialog() {
  const [open, setOpen] = useState(false);
  const [openDeleteState, setOpenDeleteState] = useState(false);
  const [selected, setSelected] = useState<CategoryData | null>(null);

  /* ================== FORM ================== */
  const [form, setForm] = useState<CategoryForm>({
    category_name: "",
  });
  const [errors, setErrors] = useState<CategoryFormErrors>({});

  /* ================== FILTERS ================== */
  const [filters, setFilters] = useState<GetCategoriesParams>({
    search: "",
    page: 1,
    limit: 10,
    start_date: "", // ✅ TAMBAH
    // end_date: "", // (opsional)
  });

  /* ================== DIALOG ================== */
  const openCreate = () => {
    setSelected(null);
    setForm({ category_name: "" });
    setErrors({});
    setOpen(true);
  };

  const openEdit = (cat: CategoryData) => {
    setSelected(cat);
    setForm({ category_name: cat.category_name });
    setErrors({});
    setOpen(true);
  };

  const close = () => setOpen(false);

  const openDelete = (cat: CategoryData) => {
    setSelected(cat);
    setOpenDeleteState(true);
  };

  const closeDelete = () => {
    setSelected(null);
    setOpenDeleteState(false);
  };

  /* ================== FORM HANDLER ================== */
  const setFormField = (field: keyof CategoryForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  /* ================== FILTER HANDLER ================== */
  const setSearch = (search: string) =>
    setFilters((prev) => ({
      ...prev,
      search,
      page: 1,
    }));

  const setFilterField = <K extends keyof GetCategoriesParams>(
    field: K,
    value: GetCategoriesParams[K]
  ) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
      page: 1, // reset page saat filter berubah
    }));
  };

  /* ================== SUBMIT ================== */
  const submit = async (onValid: (payload: CategoryForm) => Promise<void>) => {
    const fieldErrors: CategoryFormErrors = {};
    try {
      await onValid(form);
      return true;
    } catch (err) {
      const error = err as ApiError;
      if (Array.isArray(error.response?.data?.message)) {
        error.response.data.message.forEach(
          (e: { path: string; message: string }) => {
            fieldErrors[e.path as keyof CategoryForm] = e.message;
          }
        );
      } else if (typeof error.response?.data?.message === "string") {
        fieldErrors.category_name = error.response.data.message;
      }
      setErrors(fieldErrors);
      return false;
    }
  };

  return {
    open,
    openDeleteState,
    selected,
    mode: selected ? "edit" : "create",

    form,
    setFormField,
    errors,

    openCreate,
    openEdit,
    close,
    openDelete,
    closeDelete,

    filters,
    setFilters,
    setSearch,
    setFilterField, // ✅ WAJIB DIEKSPOR
    submit,
  };
}
