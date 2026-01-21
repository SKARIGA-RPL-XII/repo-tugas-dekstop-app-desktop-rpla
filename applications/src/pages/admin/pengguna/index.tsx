import { Eye, EyeOff, Plus } from "lucide-react";
import { useEffect, useState } from "react";
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
import { useUsers } from "../../../hooks/users/useUsers";
import { useUserDialog } from "../../../hooks/users/useUserDialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "../../../components/UI/AlertDialog";
import { Input } from "../../../components/UI/Input";
import { getUserColumns } from "../../../columns/userColumns";
import { useToast } from "../../../components/UI/ToastContext";
import { useAuth } from "../../../context/AuthContext";

const Pengguna = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { user } = useAuth();

  const {
    selected,
    openCreate,
    mode,
    form,
    setFormField,
    setErrors,
    openEdit,
    close,
    openDelete,
    closeDelete,
    openDeleteState,
    open,
    filters,     
    setSearch,
    setFilterField,  
    resetFilters, 
  } = useUserDialog();


  const {
    data,
    meta,
    loading,
    refetch,
    createUser,
    createLoading,
    updateUser,
    updateLoading,
    deleteUser,
    deleteLoading,
  } = useUsers(filters);

  useEffect(() => {
    refetch();
  }, []);



  const { addToast } = useToast();

  const isLoading = loading || createLoading || updateLoading || deleteLoading;
  const navigate = useNavigate();

  const openDetail = (user: any) => {
    navigate(`/admin/pengguna/${user.id}/detail`);
  };



  const columns = getUserColumns({
    openEdit,
    openDelete,
    openDetail,
    isLoading,
  });


  useEffect(() => {
    if (mode === "edit" && selected) {
      setFormField("username", selected.username ?? "");
      setFormField("email", selected.email ?? "");
      setFormField("role", selected.role || "cashier");
      setFormField(
        "is_blocked",
        selected.is_blocked === true ||
        selected.is_blocked === 1 ||
        selected.is_blocked === "1"
      );

      setFormField("password", "");
      setFormField("password_confirmation", "");
    }

    if (mode === "create") {
      setFormField("password", "");
      setFormField("password_confirmation", "");
      setFormField("role", "cashier");
      setFormField("is_blocked", false);
    }
  }, [mode, selected]);

  const handleSubmit = async () => {
    try {
      setErrors({});

      if (mode === "create") {
        if (
          !form.username ||
          !form.email ||
          !form.password ||
          !form.password_confirmation
        ) {
          return addToast({
            title: "field wajib diisi",
            description: "Harap isi semua field yang ada pada form",
            type: "error",
          });
        }

        if (form.password.length < 6) {
          return addToast({
            title: "Password tidak valid",
            description: "Password minimal 6 karakter",
            type: "error",
          });
        }

        if (form.password !== form.password_confirmation) {
          return addToast({
            title: "Password tidak sama",
            description: "Password dan konfirmasi password harus sama",
            type: "error",
          });
        }

        await createUser({
          username: form.username,
          email: form.email,
          password: form.password,
          password_confirmation: form.password_confirmation,
          role: form.role,
          is_blocked: Boolean(form.is_blocked),
        });

        addToast({
          title: "Berhasil",
          description: "User berhasil ditambahkan",
          type: "success",
        });
      }

      if (mode === "edit" && selected) {
        const isChanged =
          form.username !== selected.username ||
          form.email !== selected.email ||
          form.role !== selected.role ||
          form.is_blocked !== selected.is_blocked ||
          !!form.password;

        if (!isChanged) {
          return addToast({
            title: "Tidak ada perubahan",
            description: "Ubah minimal satu data sebelum menyimpan",
            type: "error",
          });
        }

        if (form.password) {
          if (form.password.length < 6) {
            return addToast({
              title: "Password tidak valid",
              description: "Password minimal 6 karakter",
              type: "error",
            });
          }

          if (!form.password_confirmation) {
            return addToast({
              title: "Konfirmasi wajib",
              description: "Konfirmasi password harus diisi",
              type: "error",
            });
          }

          if (form.password !== form.password_confirmation) {
            return addToast({
              title: "Password tidak sama",
              description: "Password dan konfirmasi password harus sama",
              type: "error",
            });
          }
        }

        const payload: any = {
          username: form.username,
          email: form.email,
          role: form.role,
          is_blocked: Boolean(form.is_blocked),        
};

        if (form.password) {
          payload.password = form.password;
          payload.password_confirmation = form.password_confirmation;
        }

        
        await updateUser({
          id: selected.id,
          payload,
        });

        addToast({
          title: "Berhasil",
          description: "User berhasil diperbarui",
          type: "success",
        });
      }

      refetch();
      close();
    } catch (err: any) {
      console.log(err);
      addToast({
        title: "Gagal",
        description: err.response?.data?.message || "Terjadi kesalahan",
        type: "error",
      });
    }
  };

  const handleDelete = async () => {
    if (!selected?.id) return;
    if (selected?.id == user?.id) {
      addToast({
        title: "Gagal",
        description: "Anda tidak dapat menghapus diri sendiri",
        type: "error",
      });
      return;
    }

    try {
      await deleteUser(selected.id);

      addToast({
        title: "User deleted successfully",
        description: `User "${selected.username}" berhasil dihapus.`,
        type: "success",
      });

      refetch();
      closeDelete();
    } catch (err: any) {
      addToast({
        title: "Failed to delete user",
        description: err.response?.data?.message || "Something went wrong",
        type: "error",
      });
    }
  };
  

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <ContainerHeaderPage className="mb-5">
        <HeaderTitle>Pengguna</HeaderTitle>
        <HeaderActions>
          <Button
            className="flex items-center gap-2"
            onClick={openCreate}
            disabled={isLoading}
          >
            <Plus /> Tambah Pengguna
          </Button>
        </HeaderActions>
      </ContainerHeaderPage>

      <Card>
      <HeaderTableContainer className="flex flex-wrap items-center gap-3">

        <div className="relative">
          <HeaderTableSearch
            value={filters.search}
            onChange={(val) => setSearch(val)}
            onSearch={(val) => setSearch(val)}
            placeholder="Telusuri sesuatu..."
            className="w-64"
          />
        </div>

        <label className="flex items-center gap-2 h-10 px-4 border border-gray-200 rounded-full bg-white text-sm cursor-pointer hover:bg-gray-50">
          <span className="text-gray-400">
            <i className="lucide lucide-user w-4 h-4" />
          </span>
          <select
            className="bg-transparent outline-none text-sm cursor-pointer"
            value={filters.role}
            onChange={(e) => setFilterField("role", e.target.value)}
          >
            <option value="">Role</option>
            <option value="admin">Admin</option>
            <option value="cashier">cashier</option>
          </select>
        </label>

        <label className="flex items-center gap-2 h-10 px-4 border border-gray-200 rounded-full bg-white text-sm cursor-pointer hover:bg-gray-50">
          <span className="text-gray-400">
            <i className="lucide lucide-check-circle w-4 h-4" />
          </span>
          <select
            className="bg-transparent outline-none text-sm cursor-pointer"
            value={filters.status}
            onChange={(e) => setFilterField("status", e.target.value)}
          >
            <option value="">Status</option>
            <option value="active">Aktif</option>
            <option value="blocked">Di Blokir</option>
          </select>
        </label>

        <label className="flex items-center gap-2 h-10 px-4 border border-gray-200 rounded-full bg-white text-sm cursor-pointer hover:bg-gray-50">
          <span className="text-gray-400">
            <i className="lucide lucide-calendar w-4 h-4" />
          </span>
          <input
            type="date"
            className="bg-transparent outline-none text-sm cursor-pointer"
            value={filters.start_date}
            onChange={(e) => setFilterField("start_date", e.target.value)}
          />
        </label>

      </HeaderTableContainer>

        <DataTable
          columns={columns}
          data={data}
          isLoading={isLoading}
          noDataComponent={<EmptyNoData onRefresh={refetch} />}
          noResultsComponent={<EmptyNoResults onRefresh={refetch} />}
          pageSize={meta.limit}
          total={meta.count}
          page={filters.page}
          onPageChange={(newPage) =>
            setFilterField("page", Number(newPage))
          }
        />

      </Card>
      <AlertDialog
        open={open}
        onOpenChange={(v) => !v && close()}
        className="max-w-5xl w-full"
      >
        <AlertDialogHeader className="bg-gray-100 px-8 py-4 font-semibold">
          {mode === "edit" ? "Edit Pengguna" : "Tambah Pengguna Baru"}
        </AlertDialogHeader>

        <AlertDialogContent className="px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <InputBlock
              label="Nama Pengguna"
              required
              value={form.username}
              onChange={(v) => setFormField("username", v)}
            />
            <InputBlock
              label="Email"
              type="email"
              required
              value={form.email}
              onChange={(v) => setFormField("email", v)}
            />

            <PasswordBlock
              label="Password"
              value={form.password}
              show={showPassword}
              setShow={setShowPassword}
              onChange={(v) => setFormField("password", v)}
              placeholder={
                mode === "edit"
                  ? "Kosongkan jika tidak ingin mengubah"
                  : "Masukkan password"
              }
            />

            <PasswordBlock
              label="Konfirmasi Password"
              value={form.password_confirmation}
              show={showConfirmPassword}
              setShow={setShowConfirmPassword}
              onChange={(v) => setFormField("password_confirmation", v)}
              placeholder={
                mode === "edit"
                  ? "Kosongkan jika tidak ingin mengubah"
                  : "Konfirmasi password"
              }
            />
            <SelectBlock
              label="Role"
              value={form.role}
              onChange={(v) => setFormField("role", v)}
              options={["admin", "cashier"]}
            />
            <SelectBlock
              label="Status"
              value={form.is_blocked ? "blocked" : "active"}
              onChange={(v) => setFormField("is_blocked", v === "blocked")}
              options={["active", "blocked"]}
            />
          </div>
        </AlertDialogContent>

        <AlertDialogFooter className="px-8 py-4">
          <Button
            className="bg-muted-foreground hover:bg-muted-foreground/50"
            onClick={close}
          >
            Batal
          </Button>
          <Button type="button" onClick={handleSubmit}>
            {mode === "edit" ? "Simpan" : "Tambah"}
          </Button>
        </AlertDialogFooter>
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

const InputBlock = ({
  label,
  value,
  onChange,
  type = "text",
  required,
}: any) => (
  <div>
    <label className="text-sm font-medium text-gray-700 mb-2 block">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <Input
      className="h-11"
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

const PasswordBlock = ({
  label,
  value,
  onChange,
  show,
  setShow,
  placeholder,
}: any) => (
  <div>
    <label className="text-sm font-medium text-gray-700 mb-2 block">
      {label}
    </label>
    <div className="relative">
      <Input
        className="h-11 pr-10"
        type={show ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button
        type="button"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
        onClick={() => setShow(!show)}
      >
        {show ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  </div>
);

const SelectBlock = ({ label, value, onChange, options }: any) => (
  <div>
    <label className="text-sm font-medium text-gray-700 mb-2 block">
      {label}
    </label>
    <select
      className="w-full h-11 rounded-md border border-gray-300 px-3 text-sm bg-white"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((o: string) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  </div>
);

export default Pengguna;
