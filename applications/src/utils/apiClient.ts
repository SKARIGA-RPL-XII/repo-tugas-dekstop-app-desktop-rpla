import axios from "axios";

const ApiClient = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

/* 🔐 INTERCEPTOR AUTH */
ApiClient.interceptors.request.use(
  (config) => {
    // CEK SEMUA KEY TOKEN YANG MUNGKIN
    const token =
      localStorage.getItem("token") ||
      localStorage.getItem("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default ApiClient;
