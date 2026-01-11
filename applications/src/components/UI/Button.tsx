import { cn } from "../../utils/cn";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "destructive" | "outline";
  size?: "sm" | "md" | "lg";
};

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={cn(
        "rounded-lg font-medium transition cursor-pointer focus:outline-none disabled:opacity-50 disabled:pointer-events-none",
        {
          primary: "bg-primary text-primary-foreground hover:bg-primary/90",
          secondary:
            "bg-secondary text-secondary-foreground hover:bg-secondary/80",
          destructive:
            "bg-destructive text-destructive-foreground hover:bg-destructive/90",
          outline:
            "border border-muted-foreground bg-transparent hover:bg-muted/5",
        }[variant],
        {
          sm: "px-3 py-1 text-sm",
          md: "px-4 py-2 text-sm",
          lg: "px-6 py-3 text-base",
        }[size],
        className
      )}
    >
      {children}
    </button>
  );
};
