import { useNavigate } from "react-router-dom";
import NotFoundImg from "../../assets/404 Error.svg";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen gap-6 bg-white">
      <img
        src={NotFoundImg}
        alt="404 Not Found"
        className="w-full max-w-[420px]"
      />

      <div className="flex flex-col sm:flex-row items-center gap-1 text-sm text-gray-500 text-center">
        <span>Halaman yang kamu cari tidak ditemukan,</span>

        <span
          onClick={() => navigate(-1)}
          className="text-indigo-600 underline cursor-pointer hover:text-indigo-700"
        >
          klik di sini untuk kembali
        </span>
      </div>
    </div>
  );
}

export default NotFound;
