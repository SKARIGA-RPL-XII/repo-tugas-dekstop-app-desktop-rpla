import * as React from "react";
import { cn } from "../../utils/cn";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  variant?: "default" | "error" | "disabled";
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <input
        ref={ref}
        {...props}
        className={cn(
          "w-full rounded-md border text-black px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 transition disabled:cursor-not-allowed disabled:opacity-50",
          {
            default:
              "border bg-white border-slate-200 focus:border-none focus:ring-primary",
            error: "border-red-500 focus:ring-red-500",
            disabled:
              "border-border bg-muted text-muted-foreground cursor-not-allowed",
          }[variant],
          className
        )}
      />
    );
  }
);

Input.displayName = "Input";
