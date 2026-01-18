import React from "react";
import { Input } from "./Input";
import { Search } from "lucide-react";
import { cn } from "../../utils/cn";

export type SearchInputProps = React.ComponentProps<typeof Input> & {
  placeholder?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  debounceTime?: number;
};

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      placeholder = "Search...",
      value: propValue,
      onValueChange,
      onSearch,
      debounceTime = 400,
      className,
      ...props
    },
    ref
  ) => {
    const [value, setValue] = React.useState(propValue || "");
    const debounceRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    React.useEffect(() => {
      if (propValue !== undefined) setValue(propValue);
    }, [propValue]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      if (propValue === undefined) setValue(val);

      onValueChange?.(val);

      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        onSearch?.(val);
      }, debounceTime);
    };

    React.useEffect(() => {
      return () => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
      };
    }, []);

    return (
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          ref={ref}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={cn("pl-10", className)}
          {...props}
        />
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";
