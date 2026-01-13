import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./components/UI/ToastContext";
import { ToastViewport } from "./components/UI/Toast";
import router from "./routes/routes";
import AppLoader from "./components/AppLoader";
import { useState } from "react";
import "./index.css";
import "./bootstrap";

const queryClient = new QueryClient();

function Root() {
  const [ready, setReady] = useState(false);

  if (!ready) return <AppLoader onDone={() => setReady(true)} />;

  return (
    <ToastProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
        <ToastViewport />
      </AuthProvider>
    </ToastProvider>
  );
}

createRoot(document.getElementById("root")!).render(<Root />);
