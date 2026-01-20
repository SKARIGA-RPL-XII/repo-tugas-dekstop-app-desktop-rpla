import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  User as UserIcon,
  Mail,
  Shield,
  Calendar,
  Info,
} from "lucide-react";

import { UserServices } from "../../../services/userService";
import { formatDate } from "../../../utils/formatDate";
import {
  ContainerHeaderPage,
  HeaderTitle,
} from "../../../components/UI/component-header-page";
import { Card } from "../../../components/UI/Card";
import { Button } from "../../../components/UI/Button";

const DetailPengguna = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      try {
        const res = await UserServices.getUserById(id);
        setUser(res?.data ?? res);
      } catch (err) {
        console.error(err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Memuat data pengguna...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-64 text-red-500">
        Data pengguna tidak ditemukan
      </div>
    );
  }

  return (
    <div className="w-full px-4">
      {/* HEADER */}
      <ContainerHeaderPage>
        <HeaderTitle>Detail Pengguna</HeaderTitle>
      </ContainerHeaderPage>

      <div className="max-w-6xl flex flex-col lg:flex-row gap-6 mt-4">

        {/* ================= LEFT CARD ================= */}
        <Card className="w-full lg:w-[260px] rounded-3xl shadow-sm p-6 flex flex-col items-center text-center">
          <img
            src={`https://ui-avatars.com/api/?name=${user.username}&background=6366f1&color=fff`}
            alt={user.username}
            className="w-24 h-24 rounded-xl border-4 border-white shadow-sm object-cover"
          />

          <h2 className="mt-4 text-sm font-semibold text-gray-800">
            {user.username}
          </h2>

          <p className="text-xs text-gray-400 mb-3">
            {user.email}
          </p>

          <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-600 text-xs font-medium">
            {user.role}
          </span>

          <Button
            onClick={() => navigate(-1)}
            className="mt-35 w-full h-9 text-sm bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            ← Kembali
          </Button>
        </Card>

        {/* ================= RIGHT CARD ================= */}
        <Card className="flex-1 rounded-3xl shadow-sm p-8">
          <div className="flex items-center gap-2 mb-6">
            <Info size={16} className="text-indigo-600" />
            <h3 className="text-sm font-semibold text-gray-800">
              Informasi Dasar
            </h3>
          </div>

          <InfoRow
            icon={<UserIcon size={14} />}
            label="Nama Lengkap"
            value={user.username}
          />

          <InfoRow
            icon={<Mail size={14} />}
            label="Email"
            value={user.email}
          />

          <InfoRow
            icon={<Shield size={14} />}
            label="Role"
            value={user.role}
          />

          <InfoRow
            icon={<Calendar size={14} />}
            label="Bergabung Pada"
            value={formatDate(user.created_at)}
            noBorder
          />
        </Card>
      </div>
    </div>
  );
};

export default DetailPengguna;

/* ================= HELPER ================= */

const InfoRow = ({
  icon,
  label,
  value,
  noBorder = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  noBorder?: boolean;
}) => (
  <div
    className={`flex items-start gap-4 py-4 ${
      !noBorder ? "border-b border-gray-100" : ""
    }`}
  >
    <div className="text-indigo-600 mt-1">
      {icon}
    </div>
    <div>
      <p className="text-xs text-gray-400 mb-1">
        {label}
      </p>
      <p className="text-sm text-gray-600">
        {value}
      </p>
    </div>
  </div>
);
