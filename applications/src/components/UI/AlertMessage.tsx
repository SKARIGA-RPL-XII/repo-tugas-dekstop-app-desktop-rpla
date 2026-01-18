import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "../../utils/cn";

export type AlertType = "success" | "error" | "warning" | "info";

interface AlertMessageProps {
  open: boolean;
  type: AlertType;
  title: string;
  description?: string;
  onClose: () => void;
}

const colorMap = {
  success: "bg-green-100 border-green-500 text-green-800",
  error: "bg-red-100 border-red-500 text-red-800",
  warning: "bg-yellow-100 border-yellow-500 text-yellow-800",
  info: "bg-blue-100 border-blue-500 text-blue-800",
};

export const AlertMessage = ({
  open,
  type,
  title,
  description,
  onClose,
}: AlertMessageProps) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed top-6 right-6 z-[9999]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <div
            className={cn(
              "min-w-[280px] max-w-sm border-l-4 rounded-lg shadow-lg p-4 bg-white",
              colorMap[type]
            )}
          >
            <div className="flex justify-between items-start gap-3">
              <div>
                <p className="font-semibold">{title}</p>
                {description && (
                  <p className="text-sm mt-1">{description}</p>
                )}
              </div>

              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
