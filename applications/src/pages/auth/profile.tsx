import { useRef, useState } from "react";
import {
  User,
  Mail,
  Shield,
  Calendar,
  Info,
  X,
  Pencil,
  Lock
} from "lucide-react";

// ✅ TAMBAHAN (SESUIAI INSTRUKSI)
import profileImage from "../../assets/profile.png";

export const ProfilePage = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const [profile, setProfile] = useState({
    name: "Albus Dumbledore",
    email: "albusdumbledore@gmail.com",
    role: "Admin",
    joined: "01 Januari 1945",
    photo: profileImage, // ✅ DEFAULT KE profile.png
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setProfile({ ...profile, photo: preview });
    }
  };

  return (
    <div className="w-full min-h-screen p-6 ">
      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-5">
        <h1 className="text-lg font-semibold text-gray-800">Profil Saya</h1>
        <p className="text-xs text-gray-400">
          Beranda &gt; <span className="text-indigo-600 font-medium">Profil Saya</span>
        </p>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT CARD */}
        <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center">
          <div className="relative">
            <img
              src={profile.photo}
              alt="Profile"
              className="w-28 h-28 rounded-lg object-cover border"
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-1 right-1 bg-orange-500 p-1.5 rounded-md hover:bg-orange-600"
            >
              <Pencil size={14} className="text-white" />
            </button>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          <h2 className="mt-4 font-semibold text-sm">{profile.name}</h2>
          <p className="text-xs text-gray-500">{profile.email}</p>

          <span className="mt-3 px-4 py-1 text-xs font-medium rounded-md bg-indigo-100 text-indigo-600">
            {profile.role}
          </span>
        </div>

        {/* RIGHT CARD */}
        <div className="md:col-span-2 bg-white rounded-lg shadow-sm p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-5">
              <Info size={16} className="text-indigo-600" />
              <h3 className="font-semibold text-lg">Informasi Dasar</h3>
            </div>

            <InfoRow icon={<User size={16} />} label="Nama Lengkap" value={profile.name} />
            <InfoRow icon={<Mail size={16} />} label="Email" value={profile.email} />
            <InfoRow icon={<Shield size={16} />} label="Role" value={profile.role} />
            <InfoRow
              icon={<Calendar size={16} />}
              label="Bergabung Pada"
              value={profile.joined}
              noBorder
            />
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={() => setOpenModal(true)}
              className="px-6 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Ubah Informasi Saya
            </button>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpenModal(false)}
          />

          <div className="relative bg-white w-full max-w-xl rounded-lg shadow-lg p-6 z-10">
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-semibold text-sm">Ubah Informasi Saya</h3>
              <button onClick={() => setOpenModal(false)}>
                <X size={18} className="text-gray-400 hover:text-gray-600" />
              </button>
            </div>

            {/* FORM */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                icon={<User size={14} />}
                label="Nama Lengkap"
                name="name"
                value={profile.name}
                onChange={handleChange}
              />

              <FormInput
                icon={<Mail size={14} />}
                label="Email"
                name="email"
                value={profile.email}
                onChange={handleChange}
              />

              <div>
                <label className="text-xs text-gray-500">Role</label>
                <div className="flex items-center gap-2 mt-1 border rounded-md px-3 py-2">
                  <Shield size={14} className="text-gray-400" />
                  <select
                    name="role"
                    value={profile.role}
                    onChange={handleChange}
                    className="w-full outline-none bg-transparent text-sm"
                  >
                    <option>Admin</option>
                    <option>User</option>
                    <option>Pelayan</option>
                    <option>Dapur</option>
                  </select>
                </div>
              </div>

              <FormInput
                icon={<Calendar size={14} />}
                label="Bergabung Pada"
                name="joined"
                value={profile.joined}
                onChange={handleChange}
              />

              <FormInput
                icon={<Lock size={14} />}
                label="Password"
                name="password"
                type="password"
                value={profile.password}
                onChange={handleChange}
              />

              <FormInput
                icon={<Lock size={14} />}
                label="Konfirmasi Password"
                name="confirmPassword"
                type="password"
                value={profile.confirmPassword}
                onChange={handleChange}
              />
            </div>

            {/* ACTION */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setOpenModal(false)}
                className="px-5 py-2 text-sm border rounded-md hover:bg-gray-100"
              >
                Batal
              </button>
              <button
                onClick={() => setOpenModal(false)}
                className="px-5 py-2 text-sm bg-orange-500 text-white rounded-md hover:bg-orange-600"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ===== COMPONENTS ===== */

const InfoRow = ({ icon, label, value, noBorder }: any) => (
  <div className={`flex gap-4 py-3 ${!noBorder ? "border-b" : ""}`}>
    <div className="text-indigo-600 mt-1">{icon}</div>
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  </div>
);

const FormInput = ({ icon, label, ...props }: any) => (
  <div>
    <label className="text-xs text-gray-500">{label}</label>
    <div className="flex items-center gap-2 mt-1 border rounded-md px-3 py-2">
      <span className="text-gray-400">{icon}</span>
      <input {...props} className="w-full outline-none bg-transparent text-sm" />
    </div>
  </div>
);
