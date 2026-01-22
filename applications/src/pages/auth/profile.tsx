import { useRef } from "react";
import { User, Mail, Shield, Calendar, Info, Pencil, Lock } from "lucide-react";

import { useProfileDialog } from "../../hooks/users/useProfileDialog";
import { UserServices } from "../../services/userService";
import profileImage from "../../assets/unknown.gif";
import {
  ContainerHeaderPage,
  HeaderTitle,
} from "../../components/UI/component-header-page";
import { Card } from "../../components/UI/Card";
import { Button } from "../../components/UI/Button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "../../components/UI/AlertDialog";
import { useToast } from "../../components/UI/ToastContext";
import { Input } from "../../components/UI/Input";
import { useAuth } from "../../context/AuthContext";
import { formatDate } from "../../utils/formatDate";
import { getInitial, getRandomColor } from "../../utils/avatar";

export const ProfilePage = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { user, setUser } = useAuth();
  const { addToast } = useToast();

  const profile = useProfileDialog(user);

  const displayName = user?.username || user?.email || "User";
  const avatarColor = getRandomColor(displayName);

  const handleSaveProfile = async () => {
    if (!profile.form.username || profile.form.username.trim().length < 3) {
      addToast({
        type: "error",
        title: "Username tidak valid",
        description: "Username minimal 3 karakter",
      });
      return;
    }

    if (profile.form.password) {
      if (profile.form.password.length < 6) {
        addToast({
          type: "error",
          title: "Password terlalu pendek",
          description: "Password minimal 6 karakter",
        });
        return;
      }

      if (profile.form.password !== profile.form.confirmPassword) {
        addToast({
          type: "error",
          title: "Password tidak cocok",
          description: "Password dan konfirmasi harus sama",
        });
        return;
      }
    }

    const success = await profile.submit(async (payload) => {
      const updatedFromApi = await UserServices.updateUser(user.id, payload);

      const updatedUser = {
        ...user,
        ...updatedFromApi,
      } as ReturnType<typeof useAuth>["user"];

      setUser(updatedUser);
    });

    if (success) {
      addToast({
        type: "success",
        title: "Profil berhasil diperbarui",
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const preview = URL.createObjectURL(file);
    }
  };

  return (
    <div className="w-full min px-4">
      <ContainerHeaderPage>
        <HeaderTitle>Profil Saya</HeaderTitle>
      </ContainerHeaderPage>

      <div className="max-w-6xl flex flex-col lg:flex-row gap-3 w-full">
        <Card className="flex rounded-2xl shadow-none flex-col items-center space-y-2 w-full lg:w-62.5 overflow-hidden">
          <div className="max-w-xl flex justify-center flex-col items-center pt-10">
            <div className="relative">
              <div
                className={`w-28 h-28 rounded-lg flex items-center justify-center text-white text-3xl font-bold select-none ${avatarColor}`}
              >
                {getInitial(displayName)}
              </div>

              <Button
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-2 -right-2 bg-[#F59200] p-1.5 rounded-md hover:bg-orange-300 cursor-pointer"
              >
                <Pencil size={14} className="text-white" />
              </Button>

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            <h2 className="mt-4 font-semibold text-lg">{user.username}</h2>
            <p className="text-xs text-muted-foreground">{user.email}</p>

            <Card
              className={`mt-3 px-4 py-2 text-md font-bold rounded-lg w-full ${user?.role == "admin" ? "bg-indigo-50 text-indigo-500" : "bg-orange-50 text-orange-500"} text-center shadow-none`}
            >
              {user.role}
            </Card>
          </div>
        </Card>

        <Card className="md:flex-2 shadow-none rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-5">
              <Info size={16} className="text-indigo-600" />
              <h3 className="font-semibold text-lg">Informasi Dasar</h3>
            </div>

            <InfoRow
              icon={<User size={16} />}
              label="Nama Lengkap"
              value={user?.username ?? "unknown"}
            />
            <InfoRow
              icon={<Mail size={16} />}
              label="Email"
              value={user?.email ?? "unknown"}
            />
            <InfoRow
              icon={<Shield size={16} />}
              label="Role"
              value={user.role ?? "unknown"}
            />
            <InfoRow
              icon={<Calendar size={16} />}
              label="Bergabung Pada"
              value={formatDate(user.created_at) ?? "unknown"}
            />
          </div>

          <div className="flex justify-end mt-6">
            <Button onClick={profile.openEdit} className="bg-primary">
              Ubah Informasi Saya
            </Button>
          </div>
        </Card>
      </div>

      <AlertDialog
        open={profile.open}
        onOpenChange={profile.close}
        className="w-full min-w-3xl"
      >
        <AlertDialogHeader onClose={profile.close}>
          Ubah Informasi Saya
        </AlertDialogHeader>

        <AlertDialogContent className="pb-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              icon={<User size={14} />}
              label="Nama Lengkap"
              value={profile.form.username}
              onChange={(e) => profile.setField("username", e.target.value)}
            />

            <FormInput
              icon={<Mail size={14} />}
              label="Email"
              value={profile.form.email}
              onChange={(e) => profile.setField("email", e.target.value)}
            />

            <FormInput
              icon={<Lock size={14} />}
              label="Password"
              type="password"
              value={profile.form.password}
              onChange={(e) => profile.setField("password", e.target.value)}
            />

            <FormInput
              icon={<Lock size={14} />}
              label="Konfirmasi Password"
              type="password"
              value={profile.form.confirmPassword}
              onChange={(e) =>
                profile.setField("confirmPassword", e.target.value)
              }
            />
          </div>

          <AlertDialogFooter>
            <Button
              onClick={profile.close}
              className="px-5 py-2 text-sm rounded-md bg-muted-foreground hover:bg-muted/50 text-white"
            >
              Batal
            </Button>
            <Button
              onClick={handleSaveProfile}
              className="px-5 py-2 text-sm bg-orange-400 text-white rounded-md hover:bg-orange-200"
            >
              Simpan
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

const InfoRow = ({ icon, label, value, noBorder }) => (
  <div
    className={`flex flex-col gap-4 py-3 ${!noBorder ? "border-b border-gray-200" : ""}`}
  >
    <div className="flex gap-2">
      <div className="bg-indigo-100 rounded-sm flex justify-center items-center w-6 h-6 text-indigo-500">
        {icon}
      </div>
      <p className="text-md font-medium text-muted">{label}</p>
    </div>
    <p className="text-sm font-light text-muted-foreground">{value}</p>
  </div>
);

const FormInput = ({ label, isDisabled = false, ...props }) => (
  <div className="flex flex-col gap-2">
    <label className="text-xs text-gray-500">
      {label}
      <span className="text-red-500">*</span>
    </label>

    <Input
      {...props}
      disabled={isDisabled}
      className={`${isDisabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
      placeholder="CMIW"
    />
  </div>
);
