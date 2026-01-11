import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import rightImage from "../../assets/right.png";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../../components/UI/Button";
import { useToast } from "../../components/UI/ToastContext";

export default function Login() {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const { token } = useAuth();
  const { addToast } = useToast();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [remember, setRemember] = useState(true);

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      await login(form, remember);

      addToast({
        title: "Login berhasil",
        description: "Welcome back 👋",
        type: "success",
      });

      navigate("/admin/dashboard");
    } catch (err) {
      const apiErrors = err?.response?.data?.errors;
      const message = err?.response?.data?.message || "Login gagal";

      if (apiErrors) {
        setErrors({
          email: apiErrors.email?.[0],
          password: apiErrors.password?.[0],
        });
      } else {
        setErrors({ general: message });
      }

      addToast({
        title: "Login gagal",
        description: message,
        type: "error",
      });
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex bg-white relative">
      <div className="absolute top-6 left-10">
        <img src={logo} alt="SkarPOS Logo" className="h-[50px] w-[240px]" />
      </div>

      <div className="w-[60%] flex flex-col justify-center pl-60">
        <h2 className="text-[55px] font-bold mb-2">Login</h2>
        <p className="text-gray-400 text-sm mb-10 font-semibold">
          Selamat datang kembali ke SkarPOS
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              name="email"
              type="email"
              placeholder="Masukkan Email Anda"
              value={form.email}
              onChange={handleChange}
              className={`w-full border-b ${
                errors.email
                  ? "border-b-red-500 text-red-500"
                  : "border-gray-300"
              } px-4 py-3 text-sm focus:outline-none`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <input
              name="password"
              type="password"
              placeholder="Masukkan Password Anda"
              value={form.password}
              onChange={handleChange}
              className={`w-full border-b ${
                errors.password
                  ? "border-b-red-500 text-red-500"
                  : "border-gray-300"
              } px-4 py-3 text-sm focus:outline-none`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            Ingat Saya
          </label>

          {errors.general && (
            <p className="text-red-500 text-sm">{errors.general}</p>
          )}

          <Button
            disabled={loading}
            type="submit"
            variant="primary"
            className="w-full text-white py-3 rounded-full text-sm font-semibold cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Loading..." : "Login"}
          </Button>
        </form>
      </div>

      <div className="w-[75%] relative overflow-hidden px-20">
        <img
          src={rightImage}
          alt="Right Illustration"
          className="absolute -top-0.2 right-62 w-full h-full object-contain translate-x-1/2"
        />
      </div>
    </div>
  );
}
