import trashIcon from "../assets/trash.png"

const DeleteAlert = ({
  open,
  onCancel,
  onConfirm,
}) => {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center font-montserrat">

      {/* OVERLAY */}
      <div
        onClick={onCancel}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      {/* ALERT BOX */}
      <div className="relative bg-white w-[400px] rounded-2xl shadow-[0_14px_45px_rgba(0,0,0,0.25)] px-6 py-9 z-10 text-center">

        {/* ICON — SUPER BESAR */}
        <div className="-mt-20 mx-auto mb-6 w-72 h-72 flex items-center justify-center">
          <img
            src={trashIcon}
            alt="Hapus"
            className="w-64 h-64 object-contain"
          />
        </div>


        {/* TITLE */}
        <h2 className="-mt-20 text-xl font-semibold text-gray-900 mb-2">
          Hapus Data
        </h2>


        {/* DESCRIPTION */}
        <p className="text-sm text-gray-500 leading-relaxed mb-8">
          Data yang Anda pilih akan dihapus <br />
          secara permanen dan tidak dapat dikembalikan.
        </p>

        {/* ACTION BUTTONS */}
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="w-36 py-2.5 rounded-lg bg-gray-400 text-white text-sm font-medium hover:bg-gray-500 transition"
          >
            Batalkan
          </button>

          <button
            onClick={onConfirm}
            className="w-36 py-2.5 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteAlert
