import { Search } from "lucide-react"

const Pengguna = () => {
  const users = [
    {
      nama: "Hermione Granger",
      email: "hermionegranger@gmail.com",
      role: "Admin",
      status: "Aktif",
      tanggal: "12 Desember 2026",
    },
    {
      nama: "Cedric Diggory",
      email: "cedricdiggory@gmail.com",
      role: "Kasir",
      status: "Tidak Aktif",
      tanggal: "12 Desember 2026",
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 font-montserrat">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">
            Daftar Pengguna
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Beranda / <span className="text-indigo-600">Daftar Pengguna</span>
          </p>
        </div>

        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2">
          + Tambah Pengguna
        </button>
      </div>

      {/* CARD */}
      <div className="bg-white rounded-xl shadow-sm p-5">

        {/* FILTER */}
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Telusuri sesuatu..."
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-md text-xs w-64 outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <button className="px-3 py-2 border border-gray-200 rounded-md text-xs text-gray-500">
            Filter Role
          </button>
          <button className="px-3 py-2 border border-gray-200 rounded-md text-xs text-gray-500">
            Filter Status
          </button>
          <button className="px-3 py-2 border border-gray-200 rounded-md text-xs text-gray-500">
            Filter Tanggal Bergabung
          </button>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-[#EEF2F7] text-gray-600">
                <th className="py-3 px-4 text-left rounded-l-md font-medium">
                  Nama Pengguna
                </th>
                <th className="py-3 px-4 text-left font-medium">Email</th>
                <th className="py-3 px-4 text-left font-medium">Role</th>
                <th className="py-3 px-4 text-left font-medium">Status</th>
                <th className="py-3 px-4 text-left font-medium">
                  Bergabung Tanggal
                </th>
                <th className="py-3 px-4 text-center rounded-r-md font-medium">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {[...users, ...users, ...users, ...users].map((u, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-medium text-gray-800">
                    {u.nama}
                  </td>
                  <td className="py-2.5 px-4 text-gray-600">{u.email}</td>

                  <td className="py-2.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-md text-[11px] border
                        ${
                          u.role === "Admin"
                            ? "border-blue-400 text-blue-600 bg-blue-50"
                            : "border-orange-400 text-orange-600 bg-orange-50"
                        }
                      `}
                    >
                      {u.role}
                    </span>
                  </td>

                  <td className="py-2.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-md text-[11px]
                        ${
                          u.status === "Aktif"
                            ? "bg-emerald-100 text-emerald-600"
                            : "bg-gray-200 text-gray-500"
                        }
                      `}
                    >
                      {u.status}
                    </span>
                  </td>

                  <td className="py-2.5 px-4 text-gray-600">{u.tanggal}</td>

                  <td className="py-2.5 px-4">
                    <div className="flex justify-center gap-1.5">
                      <button className="w-7 h-7 rounded-md border border-blue-400 text-blue-500 hover:bg-blue-50">
                        👁
                      </button>
                      <button className="w-7 h-7 rounded-md border border-orange-400 text-orange-500 hover:bg-orange-50">
                        ✏
                      </button>
                      <button className="w-7 h-7 rounded-md border border-red-400 text-red-500 hover:bg-red-50">
                        🗑
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div className="flex justify-between items-center mt-5 text-xs text-gray-400">
          <p>Menampilkan 1-8 dari 21 data</p>

          <div className="flex items-center gap-1.5">
            <button className="w-7 h-7 border rounded-full">‹</button>
            <button className="w-7 h-7 bg-indigo-600 text-white rounded-full">
              1
            </button>
            <button className="w-7 h-7 border rounded-full">2</button>
            <button className="w-7 h-7 border rounded-full">3</button>
            <span>…</span>
            <button className="w-7 h-7 border rounded-full">›</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pengguna
