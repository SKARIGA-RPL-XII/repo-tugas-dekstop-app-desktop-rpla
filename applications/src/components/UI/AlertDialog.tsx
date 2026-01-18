import React, { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../utils/cn";
import { X } from "lucide-react";
import { Button } from "./Button";

type AlertDialogSize = "sm" | "md" | "lg" | "xl";

const sizeMap: Record<AlertDialogSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-2xl",
  xl: "max-w-5xl",
};

interface AlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  size?: AlertDialogSize;
  className?: string;
}

interface SectionProps {
  children: ReactNode;
  className?: string;
}

interface HeaderProps {
  children: ReactNode;
  className?: string;
  onClose?: () => void;
}

/* ===================== MAIN DIALOG ===================== */
export const AlertDialog: React.FC<AlertDialogProps> = ({
  open,
  onOpenChange,
  children,
  size = "md",
  className,
}) => {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* BACKDROP */}
          <motion.div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onOpenChange(false)}
          />

          {/* MODAL */}
          <motion.div
            className={cn(
              "relative z-10 w-full px-4",
              sizeMap[size],
              className
            )}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 600, damping: 25 }}
          >
            <div className="bg-white rounded-xl overflow-hidden shadow-xl">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

/* ===================== SECTIONS ===================== */

export const AlertDialogHeader: React.FC<AlertDialogHeaderProps> = ({
  children,
  className,
  onClose,
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between p-4 bg-gray-100",
        className
      )}
    >
      <div className="text-lg font-semibold text-gray-900">
        {children}
      </div>

      {onClose && (
        <Button
          onClick={onClose}
          variant="outline"
          className="text-gray-500 hover:text-gray-700 p-1 rounded-md transition"
        >
          <X size={20} />
        </Button>
      )}
    </div>
  );
};


export const AlertDialogContent: React.FC<SectionProps> = ({
  children,
  className,
}) => <div className={cn("px-6 py-6", className)}>{children}</div>;

export const AlertDialogFooter: React.FC<SectionProps> = ({
  children,
  className,
}) => (
  <div
    className={cn(
      "flex justify-end gap-2 px-6 py-4",
      className
    )}
  >
    {children}
  </div>
);


export const AlertDialogTitle: React.FC<SectionProps> = ({
  children,
  className,
}) => (
  <h2 className={cn("text-lg font-semibold text-gray-900", className)}>
    {children}
  </h2>
);

export const AlertDialogDescription: React.FC<SectionProps> = ({
  children,
  className,
}) => (
  <p className={cn("text-sm text-gray-600", className)}>{children}</p>
);
