import { useState } from "react";
import {
  UserData,
  UserForm,
  UserFormErrors,
  GetUsersParams,
} from "../../types/user";
import { ApiError } from "../../types/Api";

export function useUserDialog() {
  /* ================= DIALOG STATE ================= */
  const [open, setOpen] = useState(false);
  const [openDeleteState, setOpenDeleteState] = useState(false);
  const [selected, setSelected] = useState<UserData | null>(null);

  /* ================= FORM STATE ================= */
  const [form, setForm] = useState<UserForm>({
    username: "",
    email: "",
    role: "cashier", // ✅ default aman
  });

  const [errors, setErrors] = useState<UserFormErrors>({});

  /* ================= FILTER STATE ================= */
  const [filters, setFilters] = useState<GetUsersParams>({
    search: "",
    page: 1,
    limit: 10,

    role: "",        // ✅ filter role
    status: "",      // ✅ active | blocked
    start_date: "",  // ✅ tanggal mulai
    end_date: "",    // ✅ tanggal akhir
  });

  /* ================= DIALOG ACTION ================= */
  const openCreate = () => {
    setSelected(null);
    setForm({
      username: "",
      email: "",
      role: "cashier",
    });
    setErrors({});
    setOpen(true);
  };

  const openEdit = (user: UserData) => {
    setSelected(user);
    setForm({
      username: user.username,
      email: user.email,
      role: user.role,
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

  /* ================= FORM HELPERS ================= */
  const setFormField = (field: keyof UserForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  /* ================= FILTER HELPERS ================= */
  const setSearch = (search: string) =>
    setFilters((f) => ({ ...f, search, page: 1 }));

const setFilterField = (
  field: keyof GetUsersParams,
  value: string | number
) => {
  setFilters((prev) => ({
    ...prev,
    [field]: value,
    page: field === "page" ? Number(value) : 1,
  }));
};


  const resetFilters = () =>
    setFilters({
      search: "",
      page: 1,
      limit: 10,
      role: "",
      status: "",
      start_date: "",
      end_date: "",
    });

  /* ================= SUBMIT HANDLER ================= */
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

  /* ================= RETURN ================= */
  return {
    open,
    openDeleteState,
    selected,
    mode: selected ? "edit" : "create",

    // form
    form,
    setFormField,
    errors,
    setErrors,

    // dialog
    openCreate,
    openEdit,
    close,
    openDelete,
    closeDelete,

    // filters
    filters,
    setFilters,
    setFilterField,
    setSearch,
    resetFilters,

    submit,
  };
}
