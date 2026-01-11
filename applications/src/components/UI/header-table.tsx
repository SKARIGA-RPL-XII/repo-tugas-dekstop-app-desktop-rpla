import React, { ReactNode } from "react";
import { SearchInput } from "./SearchInput";
import { cn } from "../../utils/cn";
import { Separator } from "./Separator";

interface HeaderTableContainerProps {
  children: ReactNode;
  className?: string;
}

export const HeaderTableContainer: React.FC<HeaderTableContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div className={cn("mb-4", className)}>
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        {children}
      </div>

      <Separator orientation="horizontal" className="my-5" />
    </div>
  );
};

interface HeaderTableSearchProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
   onSearch?: (value: string) => void;
}

export const HeaderTableSearch: React.FC<HeaderTableSearchProps> = ({
  value,
  onChange,
  placeholder = "Search...",
  className,
  onSearch,
}) => {
  return (
    <SearchInput
      value={value}
      placeholder={placeholder}
      className={cn("max-w-sm", className)}
      onValueChange={onChange}
      onSearch={onSearch}
    />
  );
};

interface HeaderTableFilterProps {
  children: ReactNode;
  className?: string;
}

export const HeaderTableFilter: React.FC<HeaderTableFilterProps> = ({
  children,
  className,
}) => {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>{children}</div>
  );
};
