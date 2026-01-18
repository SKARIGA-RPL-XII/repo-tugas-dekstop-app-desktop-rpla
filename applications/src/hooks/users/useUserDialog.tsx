import { useState } from "react";
import {
  UserData,
  UserForm,
  UserFormErrors,
  GetUsersParams,
} from "../../types/user";
import { ApiError } from "../../types/Api";

export function useUserDialog() {
  const [open, setOpen] = useState(false);
  const [openDeleteState, setOpenDeleteState] = useState(false);
  const [selected, setSelected] = useState<UserData | null>(null);

  // 🔥 FIX 1: role DEFAULT HARUS VALID
  const [form, setForm] = useState<UserForm>({
    username: "",
    email: "",
    role: "cashier", // ✅ default
  });

  const [errors, setErrors] = useState<UserFormErrors>({});

  const [filters, setFilters] = useState<GetUsersParams>({
    search: "",
    page: 1,
    limit: 10,
  });

  const openCreate = () => {
    setSelected(null);

    // 🔥 FIX 2: JANGAN RESET role KE STRING KOSONG
    setForm({
      username: "",
      email: "",
      role: "cashier", // ✅ default
    });

    setErrors({});
    setOpen(true);
  };

  const openEdit = (user: UserData) => {
    setSelected(user);
    setForm({
      username: user.username,
      email: user.email,
      role: user.role, // admin | cashier
    });
    setErrors({});
    setOpen(true);
  };

  const close = () => setOpen(false);

  const openDelete = (user: UserData) => {
    setSelected(user);
    setOpenDeleteState(true);
  };

  const closeDelete = () => {
    setSelected(null);
    setOpenDeleteState(false);
  };

  const setFormField = (field: keyof UserForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const setSearch = (search: string) =>
    setFilters((f) => ({ ...f, search, page: 1 }));

  const submit = async (
    onValid: (payload: UserForm) => Promise<void>
  ) => {
    const fieldErrors: UserFormErrors = {};

    try {
      await onValid(form);
      return true;
    } catch (err) {
      const error = err as ApiError;

      if (Array.isArray(error.response?.data?.message)) {
        error.response.data.message.forEach(
          (e: { path: string; message: string }) => {
            fieldErrors[e.path as keyof UserForm] = e.message;
          }
        );
      } else if (typeof error.response?.data?.message === "string") {
        fieldErrors.username = error.response.data.message;
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
    setErrors,
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
