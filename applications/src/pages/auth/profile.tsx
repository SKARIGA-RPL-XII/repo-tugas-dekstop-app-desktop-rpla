import { useRef, useState } from "react";
import {
  User,
  Mail,
  Shield,
  Calendar,
  Info,
  X,
  Pencil,
  Lock,
} from "lucide-react";

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
import { Input } from "../../components/UI/Input";
import { useAuth } from "../../context/AuthContext";
import { formatDate } from "../../utils/formatDate";

export const ProfilePage = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { user } = useAuth();
  const [openModal, setOpenModal] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
// 
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

      <div className="max-w-6xl flex gap-3 w-full">
        <Card className="flex rounded-2xl shadow-none flex-col items-center space-y-2 w-full lg:w-62.5 overflow-hidden">
          <div className="max-w-xl flex justify-center flex-col items-center pt-10">
            <div className="relative">
              <img
                src={profileImage}
                alt="Profile"
                className="w-28 h-28 rounded-lg object-cover bg-accent-foreground"
              />

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

            <Card className={`mt-3 px-4 py-2 text-md font-bold rounded-lg w-full ${user?.role == "admin" ? "bg-indigo-50 text-indigo-500" : "bg-orange-50 text-orange-500"} text-center shadow-none`}>
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
            <Button
              onClick={() => setOpenModal(true)}
              className="px-6 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Ubah Informasi Saya
            </Button>
          </div>
        </Card>
      </div>

      <AlertDialog
        className="w-full min-w-3xl"
        open={openModal}
        onOpenChange={close}
      >
        <AlertDialogHeader onClose={close}>
          Ubah Informasi Saya
        </AlertDialogHeader>

        <AlertDialogContent className="pb-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              icon={<User size={14} />}
              label="Nama Lengkap"
              name="name"
              value={user.username}
              onChange={handleChange}
            />

            <FormInput
              icon={<Mail size={14} />}
              label="Email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />

            <div className="flex flex-col gap-2">
              <label className="text-xs text-gray-500">
                Role <span className="text-red-500">*</span>
              </label>
              <select
                name="role"
                value={user.role}
                onChange={handleChange}
                className="w-full rounded-md border bg-white border-slate-200 focus:border-none focus:ring-primary text-black px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 transition disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option>Admin</option>
                <option>User</option>
                <option>Pelayan</option>
                <option>Dapur</option>
              </select>
            </div>

            <FormInput
              icon={<Calendar size={14} />}
              label="Bergabung Pada"
              name="joined"
              value={formatDate(user.created_at)}
              onChange={handleChange}
            />

            <FormInput
              icon={<Lock size={14} />}
              label="Password"
              name="password"
              type="password"
              value={''}
              onChange={handleChange}
            />

            <FormInput
              icon={<Lock size={14} />}
              label="Konfirmasi Password"
              name="confirmPassword"
              type="password"
              value={''}
              onChange={handleChange}
            />
          </div>

          <AlertDialogFooter>
            <Button
              onClick={() => setOpenModal(false)}
              className="px-5 py-2 text-sm rounded-md bg-muted-foreground hover:bg-muted/50 text-white"
            >
              Batal
            </Button>
            <Button
              onClick={() => setOpenModal(false)}
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

const FormInput = ({ label }) => (
  <div className="flex flex-col gap-2">
    <label className="text-xs text-gray-500">
      {label}
      <span className="text-red-500">*</span>
    </label>
    <Input placeholder="CMIW" />
  </div>
);
