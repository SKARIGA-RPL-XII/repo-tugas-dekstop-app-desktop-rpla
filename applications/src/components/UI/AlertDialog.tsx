import React, { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../utils/cn";
import { X } from "lucide-react";
import { Button } from "./Button";

interface AlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  className?:string
}

interface AlertDialogSectionProps {
  children: ReactNode;
  className?: string;
}

interface AlertDialogHeaderProps {
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
}

export const AlertDialog: React.FC<AlertDialogProps> = ({
  open,
  onOpenChange,
  children,
  className
}) => {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => onOpenChange(false)}
          />

          <motion.div
            className="relative z-10 w-full max-w-md"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1.05 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{
              type: "spring",
              stiffness: 700,
              damping: 15,
              mass: 0.6,
            }}
          >
            <div className={cn("bg-white overflow-hidden rounded-xl" , className)}>
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export const AlertDialogTrigger: React.FC<{ children: ReactNode; onClick?: () => void }> = ({
  children,
  onClick,
}) => {
  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};

export const AlertDialogHeader: React.FC<AlertDialogHeaderProps> = ({
  children,
  className,
  onClose,
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between p-4 bg-gray-100 border-b border-gray-200",
        className
      )}
    >
      <div className="text-lg font-semibold text-gray-900">{children}</div>

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

export const AlertDialogContent: React.FC<AlertDialogSectionProps> = ({
  children,
  className,
}) => {
  return <div className={cn("p-5", className)}>{children}</div>;
};

export const AlertDialogFooter: React.FC<AlertDialogSectionProps> = ({
  children,
  className,
}) => {
  return (
    <div className={cn("flex justify-end gap-2 p-4", className)}>
      {children}
    </div>
  );
};

export const AlertDialogTitle: React.FC<AlertDialogSectionProps> = ({
  children,
  className,
}) => {
  return (
    <h2 className={cn("text-lg font-semibold text-gray-900", className)}>
      {children}
    </h2>
  );
};

export const AlertDialogDescription: React.FC<AlertDialogSectionProps> = ({
  children,
  className,
}) => {
  return <p className={cn("text-sm text-gray-600", className)}>{children}</p>;
};
