import { useState } from "react";
import {
  ProductData,
  ProductForm,
  ProductFormErrors,
  GetProductsParams,
} from "../../types/product";
import { ApiError } from "../../types/Api";

export function useProductDialog() {
  const [open, setOpen] = useState(false);
  const [openDeleteState, setOpenDeleteState] = useState(false);
  const [selected, setSelected] = useState<ProductData | null>(null);

  const [form, setForm] = useState<ProductForm>({
    name: "",
    category_id: "",
    price: 0,
    stock: 0,
    is_active: true,
  });

  const [errors, setErrors] = useState<ProductFormErrors>({});

  const [filters, setFilters] = useState<GetProductsParams>({
    search: "",
    page: 1,
    limit: 10,
  });

  const openCreate = () => {
    setSelected(null);
    setForm({
      name: "",
      category_id: "",
      price: 0,
      stock: 0,
      is_active: true,
    });
    setErrors({});
    setOpen(true);
  };

  const openEdit = (product: ProductData) => {
    setSelected(product);
    setForm({
      name: product.name,
      category_id: product.category_id,
      price: product.price,
      stock: product.stock,
      is_active: product.is_active,
    });
    setErrors({});
    setOpen(true);
  };

  const close = () => setOpen(false);

  const openDelete = (product: ProductData) => {
    setSelected(product);
    setOpenDeleteState(true);
  };

  const closeDelete = () => {
    setSelected(null);
    setOpenDeleteState(false);
  };

  const setFormField = (
    field: keyof ProductForm,
    value: string | number | boolean
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const setSearch = (search: string) =>
    setFilters((f) => ({ ...f, search, page: 1 }));

  const submit = async (
    onValid: (payload: ProductForm) => Promise<void>
  ) => {
    const fieldErrors: ProductFormErrors = {};

    try {
      await onValid(form);
      return true;
    } catch (err) {
      const error = err as ApiError;

      if (Array.isArray(error.response?.data?.message)) {
        error.response.data.message.forEach(
          (e: { path: string; message: string }) => {
            fieldErrors[e.path as keyof ProductForm] = e.message;
          }
        );
      } else if (typeof error.response?.data?.message === "string") {
        fieldErrors.name = error.response.data.message;
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
    submit,
  };
}
