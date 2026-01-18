import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "./ToastContext";
import { X } from "lucide-react";
import { cn } from "../../utils/cn";
import { isElectron } from "../../utils/electron";

const toastColors = {
  success: "bg-green-500 text-white",
  error: "bg-red-500 text-white",
  info: "bg-blue-500 text-white",
};

export const ToastViewport: React.FC = () => {
  const { toasts, removeToast } = useToast();
   const electron = isElectron();
  return (
    <div className={`fixed ${electron ? "top-13" : "top-5"} right-5 flex flex-col gap-2 z-50`}>
      <AnimatePresence initial={false}>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 50, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className={cn(
              "flex items-start justify-between gap-4 p-4 rounded-lg shadow-lg min-w-[250px] max-w-xs",
              toastColors[toast.type || "info"]
            )}
          >
            <div>
              <strong>{toast.title}</strong>
              {toast.description && <p className="text-sm">{toast.description}</p>}
            </div>
            <button onClick={() => removeToast(toast.id)}>
              <X size={16} className="text-white" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
