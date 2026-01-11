import { useState, useEffect } from "react"
import {
  Search,
  Calendar,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react"

import DeleteAlert from "../../components/Modals/DeleteAlert"
import Pagination from "../../components/Pagination"
import { useNavigate } from "react-router-dom";


const Pengguna = () => {
  const [openHapus, setOpenHapus] = useState(false)
  const [openTambah, setOpenTambah] = useState(false)
  const [selectedUser, setSelectedUser] = useState("")
  const navigate = useNavigate();


  const [openEdit, setOpenEdit] = useState(false)
  const [editUser, setEditUser] = useState<any>(null)


  const [search, setSearch] = useState("")
  const [filterDate, setFilterDate] = useState("")
  const [filterRole, setFilterRole] = useState("")
  const [filterStatus, setFilterStatus] = useState("")

  // ===== PAGINATION (TAMBAHAN) =====
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const dataUsers = [
    {
      id: 1,
      nama: "Hermione Granger",
      email: "hermionegranger@gmail.com",
      role: "Admin",
      status: "Aktif",
      tanggal: "2026-12-12",
    },
    {
      id: 2,
      nama: "Cedric Diggory",
      email: "cedricdiggory@gmail.com",
      role: "Kasir",
      status: "Tidak Aktif",
      tanggal: "2026-12-12",
    },
  ]

  const filteredData = dataUsers.filter((u) => {
    const matchSearch =
      u.nama.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())

    const matchDate = filterDate ? u.tanggal === filterDate : true
    const matchRole = filterRole ? u.role === filterRole : true
    const matchStatus = filterStatus ? u.status === filterStatus : true

    return matchSearch && matchDate && matchRole && matchStatus
  })

  // ===== PAGINATION LOGIC (TAMBAHAN) =====
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  useEffect(() => {
    setCurrentPage(1)
  }, [search, filterDate, filterRole, filterStatus])

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 font-montserrat relative">

      {/* HEADER — TIDAK DIUBAH */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Daftar Pengguna
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Beranda / <span className="text-indigo-600">Daftar Pengguna</span>
          </p>
        </div>

        <button
          onClick={() => setOpenTambah(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          + Tambah Pengguna
        </button>
      </div>

      {/* CARD — TIDAK DIUBAH */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="overflow-x-auto">

          {/* SEARCH & FILTER — TIDAK DIUBAH */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Telusuri sesuatu..."
                className="h-10 w-64 pl-9 pr-4 border border-gray-200 rounded-md text-sm"
              />
            </div>

            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="h-10 px-4 border border-gray-200 rounded-md text-sm text-gray-500"
            >
              <option value="">Filter Role</option>
              <option value="Admin">Admin</option>
              <option value="Kasir">Kasir</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="h-10 px-4 border border-gray-200 rounded-md text-sm text-gray-500"
            >
              <option value="">Filter Status</option>
              <option value="Aktif">Aktif</option>
              <option value="Tidak Aktif">Tidak Aktif</option>
            </select>

            <label className="h-10 flex items-center gap-2 px-4 border border-gray-200 rounded-md text-sm text-gray-500 cursor-pointer hover:bg-gray-50">
              <Calendar className="w-4 h-4 text-gray-400" />
              Filter Tanggal Bergabung
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="absolute opacity-0 pointer-events-none"
              />
            </label>
          </div>

          {/* TABLE — DATA DIGANTI PAGINATED */}
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-100 text-gray-600">
                <th className="py-3 px-4 text-left rounded-l-lg">Nama Pengguna</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Role</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Bergabung Tanggal</th>
                <th className="py-3 px-4 text-center rounded-r-lg">Aksi</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {paginatedData.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{u.nama}</td>
                  <td className="py-3 px-4 text-gray-600">{u.email}</td>
                  <td className="py-3 px-4">{u.role}</td>
                  <td className="py-3 px-4">{u.status}</td>
                  <td className="py-3 px-4">
                    {new Date(u.tanggal).toLocaleDateString("id-ID")}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => navigate(`/admin/pengguna/detail/${u.id}`)}
                        className="w-8 h-8 rounded-full border border-indigo-400 text-indigo-500 hover:bg-indigo-50"
                      >
                        <Eye className="w-4 h-4 mx-auto" />
                      </button>
                        <button
                        onClick={() => {
                            setEditUser(u)
                            setOpenEdit(true)
                        }}
                        className="w-8 h-8 rounded-full border border-orange-400 text-orange-500 hover:bg-orange-50"
                        >
                        <Pencil className="w-7 h-4" />
                        </button>
                      <button
                        onClick={() => {
                          setSelectedUser(u.nama)
                          setOpenHapus(true)
                        }}
                        className="w-8 h-8 rounded-full border border-red-400 text-red-500 hover:bg-red-50"
                      >
                        <Trash2 className="w-7 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* PAGINATION — TAMBAHAN */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {/* DELETE */}
      <DeleteAlert
        open={openHapus}
        description={<>Pengguna <b>"{selectedUser}"</b> akan dihapus permanen.</>}
        onCancel={() => setOpenHapus(false)}
        onConfirm={() => setOpenHapus(false)}
      />

      {/* MODAL TAMBAH PENGGUNA — TAMBAHAN */}
      {openTambah && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* OVERLAY */}
            <div
            onClick={() => setOpenTambah(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
            />

            {/* MODAL */}
            <div className="relative bg-white w-full max-w-5xl rounded-xl shadow-lg z-10">
            
            {/* HEADER */}
            <div className="flex justify-between items-center px-6 py-4 bg-slate-100 rounded-t-xl">
                <h2 className="text-base font-semibold text-gray-800">
                Tambah Pengguna Baru
                </h2>
                <button
                onClick={() => setOpenTambah(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
                >
                ×
                </button>
            </div>

            {/* FORM */}
            <div className="px-6 py-6">
                <div className="grid grid-cols-2 gap-x-6 gap-y-5">

                {/* NAMA */}
                <div>
                    <label className="text-sm font-medium text-gray-700">
                    Nama Pengguna<span className="text-red-500">*</span>
                    </label>
                    <input
                    placeholder="Masukkan nama pengguna"
                    className="mt-2 w-full h-10 px-4 border border-gray-200 rounded-md text-sm focus:ring-1 focus:ring-indigo-500 outline-none"
                    />
                </div>

                {/* EMAIL */}
                <div>
                    <label className="text-sm font-medium text-gray-700">
                    Email<span className="text-red-500">*</span>
                    </label>
                    <input
                    placeholder="Masukkan email pengguna"
                    className="mt-2 w-full h-10 px-4 border border-gray-200 rounded-md text-sm focus:ring-1 focus:ring-indigo-500 outline-none"
                    />
                </div>

                {/* PASSWORD */}
                <div>
                    <label className="text-sm font-medium text-gray-700">
                    Password<span className="text-red-500">*</span>
                    </label>
                    <input
                    type="password"
                    placeholder="Masukkan password"
                    className="mt-2 w-full h-10 px-4 border border-gray-200 rounded-md text-sm focus:ring-1 focus:ring-indigo-500 outline-none"
                    />
                </div>

                {/* KONFIRMASI PASSWORD */}
                <div>
                    <label className="text-sm font-medium text-gray-700">
                    Konfirmasi Password<span className="text-red-500">*</span>
                    </label>
                    <input
                    type="password"
                    placeholder="Konfirmasi password"
                    className="mt-2 w-full h-10 px-4 border border-gray-200 rounded-md text-sm focus:ring-1 focus:ring-indigo-500 outline-none"
                    />
                </div>

                {/* ROLE */}
                <div>
                    <label className="text-sm font-medium text-gray-700">
                    Role<span className="text-red-500">*</span>
                    </label>
                    <select
                    className="mt-2 w-full h-10 px-4 border border-gray-200 rounded-md text-sm text-gray-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                    >
                    <option value="">Pilih role pengguna</option>
                    <option value="Admin">Admin</option>
                    <option value="Kasir">Kasir</option>
                    </select>
                </div>

                {/* STATUS */}
                <div>
                    <label className="text-sm font-medium text-gray-700">
                    Status<span className="text-red-500">*</span>
                    </label>
                    <select
                    className="mt-2 w-full h-10 px-4 border border-gray-200 rounded-md text-sm text-gray-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                    >
                    <option value="">Pilih status pengguna</option>
                    <option value="Aktif">Aktif</option>
                    <option value="Tidak Aktif">Tidak Aktif</option>
                    </select>
                </div>

                </div>
            </div>

            {/* FOOTER */}
            <div className="flex justify-end gap-3 px-6 py-4">
                <button
                onClick={() => setOpenTambah(false)}
                className="px-6 py-2 rounded-md bg-gray-400 text-white text-sm hover:bg-gray-500"
                >
                Batal
                </button>
                <button
                className="px-6 py-2 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700"
                >
                Tambah
                </button>
            </div>
            </div>
        </div>
        )}
        {/* =============== END MODAL TAMBAH PENGGUNA =============== */}
        {/* =============== MODAL EDIT PENGGUNA =============== */}
        {openEdit && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                {/* OVERLAY */}
                <div
                onClick={() => setOpenEdit(false)}
                className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
                />

                {/* MODAL */}
                <div className="relative bg-white w-full max-w-5xl rounded-xl shadow-lg z-10">

                {/* HEADER */}
                <div className="flex justify-between items-center px-6 py-4 bg-slate-100 rounded-t-xl">
                    <h2 className="text-base font-semibold text-gray-800">
                    Edit Pengguna
                    </h2>
                    <button
                    onClick={() => setOpenEdit(false)}
                    className="text-gray-500 hover:text-gray-700 text-xl"
                    >
                    ×
                    </button>
                </div>

                {/* FORM */}
                <div className="px-6 py-6">
                    <div className="grid grid-cols-2 gap-x-6 gap-y-5">

                    {/* NAMA */}
                    <div>
                        <label className="text-sm font-medium text-gray-700">
                        Nama Pengguna<span className="text-red-500">*</span>
                        </label>
                        <input
                        defaultValue={editUser?.nama}
                        className="mt-2 w-full h-10 px-4 border border-gray-200 rounded-md text-sm outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                    </div>

                    {/* EMAIL */}
                    <div>
                        <label className="text-sm font-medium text-gray-700">
                        Email<span className="text-red-500">*</span>
                        </label>
                        <input
                        defaultValue={editUser?.email}
                        className="mt-2 w-full h-10 px-4 border border-gray-200 rounded-md text-sm outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                    </div>

                    {/* PASSWORD */}
                    <div>
                        <label className="text-sm font-medium text-gray-700">
                        Password
                        </label>
                        <input
                        type="password"
                        placeholder="********"
                        className="mt-2 w-full h-10 px-4 border border-gray-200 rounded-md text-sm outline-none"
                        />
                    </div>

                    {/* KONFIRMASI PASSWORD */}
                    <div>
                        <label className="text-sm font-medium text-gray-700">
                        Konfirmasi Password
                        </label>
                        <input
                        type="password"
                        placeholder="********"
                        className="mt-2 w-full h-10 px-4 border border-gray-200 rounded-md text-sm outline-none"
                        />
                    </div>

                    {/* ROLE */}
                    <div>
                        <label className="text-sm font-medium text-gray-700">
                        Role<span className="text-red-500">*</span>
                        </label>
                        <select
                        defaultValue={editUser?.role}
                        className="mt-2 w-full h-10 px-4 border border-gray-200 rounded-md text-sm text-gray-500 outline-none"
                        >
                        <option value="Admin">Admin</option>
                        <option value="Kasir">Kasir</option>
                        </select>
                    </div>

                    {/* STATUS */}
                    <div>
                        <label className="text-sm font-medium text-gray-700">
                        Status<span className="text-red-500">*</span>
                        </label>
                        <select
                        defaultValue={editUser?.status}
                        className="mt-2 w-full h-10 px-4 border border-gray-200 rounded-md text-sm text-gray-500 outline-none"
                        >
                        <option value="Aktif">Aktif</option>
                        <option value="Tidak Aktif">Tidak Aktif</option>
                        </select>
                    </div>

                    </div>
                </div>

                {/* FOOTER */}
                <div className="flex justify-end gap-3 px-6 py-4">
                    <button
                    onClick={() => setOpenEdit(false)}
                    className="px-6 py-2 rounded-md bg-gray-400 text-white text-sm hover:bg-gray-500"
                    >
                    Batal
                    </button>
                    <button
                    className="px-6 py-2 rounded-md bg-orange-500 text-white text-sm hover:bg-orange-600"
                    >
                    Simpan
                    </button>
                </div>
                </div>
            </div>
            )}

    </div>
  )
}

export default Pengguna
