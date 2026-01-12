import React from "react";
import { cn } from "../../utils/cn";
import { Button } from "./Button";
import { Inbox, SearchX, Loader2 } from "lucide-react";
import { EmptyStateProps } from "../../types/EmptyState";

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  action,
  icon,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-12 text-center text-gray-500 gap-4",
        className
      )}
    >
      {icon || <Inbox className="w-12 h-12 text-gray-400" />}
      {title && <h2 className="text-lg font-semibold text-gray-900">{title}</h2>}
      {description && <p className="text-sm text-gray-500">{description}</p>}
      {action && <div>{action}</div>}
    </div>
  );
};

export const EmptyNoData: React.FC<{
  onRefresh?: () => void;
  className?: string;
}> = ({ onRefresh, className }) => (
  <EmptyState
    title="Belum ada data"
    description="Data belum tersedia di sini."
    icon={<Inbox className="w-12 h-12 text-gray-400" />}
    action={onRefresh && <Button onClick={onRefresh}>Refresh</Button>}
    className={className}
  />
);

export const EmptyNoResults: React.FC<{
  onRefresh?: () => void;
  className?: string;
}> = ({ onRefresh, className }) => (
  <EmptyState
    title="Data tidak ditemukan"
    description="Tidak ada hasil yang sesuai pencarian atau filter."
    icon={<SearchX className="w-12 h-12 text-gray-400" />}
    action={onRefresh && <Button onClick={onRefresh}>Refresh</Button>}
    className={className}
  />
);

export const EmptyLoading: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn("py-12 text-center", className)}>
    <Loader2 className="w-10 h-10 mx-auto animate-spin text-gray-400" />
    <p className="mt-2 text-gray-500 text-sm">Memuat data...</p>
  </div>
);
