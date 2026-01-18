import { useNavigate, useParams } from "react-router-dom"
import { User, Mail, Shield, CalendarDays } from "lucide-react"

const DetailPengguna = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  // dummy data (nanti ganti API)
  const user = {
    id,
    nama: "Albus Dumbledore",
    email: "albusdumbledore@gmail.com",
    role: "Admin",
    tanggal: "1945-01-01",
    foto: "https://i.pravatar.cc/150?img=12",
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 font-montserrat">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Detail Pengguna
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Beranda / Daftar Pengguna /{" "}
          <span className="text-indigo-600">Detail Pengguna</span>
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6">

        {/* KIRI */}
        <div className="col-span-4">
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">

            <img
              src={user.foto}
              alt={user.nama}
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />

            <h2 className="text-lg font-semibold text-gray-800">
              {user.nama}
            </h2>
            <p className="text-sm text-gray-500">{user.email}</p>

            <span className="inline-block mt-3 px-4 py-1 rounded-full bg-indigo-100 text-indigo-600 text-xs font-medium">
              {user.role}
            </span>

            <button
              onClick={() => navigate(-1)}
              className="mt-6 w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md text-sm"
            >
              ← Kembali
            </button>
          </div>
        </div>

        {/* KANAN */}
        <div className="col-span-8">
          <div className="bg-white rounded-xl shadow-sm p-6">

            <h3 className="flex items-center gap-2 text-base font-semibold text-gray-800 mb-6">
              <span className="text-indigo-600">ⓘ</span> Informasi Dasar
            </h3>

            <div className="space-y-5">

              <div className="flex gap-4 items-start">
                <User className="w-5 h-5 text-indigo-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Nama Lengkap</p>
                  <p className="text-sm font-medium text-gray-800">
                    {user.nama}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <Mail className="w-5 h-5 text-indigo-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-sm font-medium text-gray-800">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <Shield className="w-5 h-5 text-indigo-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Role</p>
                  <p className="text-sm font-medium text-gray-800">
                    {user.role}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <CalendarDays className="w-5 h-5 text-indigo-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Bergabung Pada</p>
                  <p className="text-sm font-medium text-gray-800">
                    {new Date(user.tanggal).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default DetailPengguna
