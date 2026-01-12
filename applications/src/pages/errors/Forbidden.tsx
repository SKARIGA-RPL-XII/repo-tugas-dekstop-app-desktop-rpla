import { useNavigate } from "react-router-dom";
import ForbiddenImg from "../../assets/403.svg";

function Forbidden() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen gap-6 bg-white">
      <img
        src={ForbiddenImg}
        alt="403 Forbidden"
        className="w-full max-w-[420px]"
      />

      <div className="flex flex-col sm:flex-row items-center gap-1 text-sm text-gray-500 text-center">
        <span>Kamu tidak memiliki izin untuk mengakses halaman ini,</span>

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

export default Forbidden;
