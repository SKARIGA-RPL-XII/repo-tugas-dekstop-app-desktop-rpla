import { Link, useLocation } from "react-router-dom";
import { cn } from "../../utils/cn";
import { Home } from "lucide-react";

export const BreadCumb = () => {
  const { pathname } = useLocation();
  const segments = pathname
    .split("/")
    .filter(Boolean)
    .filter((s) => s !== "admin");

  return (
    <div className="flex gap-1.5 items-center font-normal">
      <Link to="/admin/dashboard" className="text-muted-foreground flex items-center gap-1">
       <Home size={13}/> Dashboard
      </Link>
      {segments.map((item, i) => {
        const url = "/admin/" + segments.slice(0, i + 1).join("/");
        const isLast = i === segments.length - 1;

        return (
          <div key={item} className="flex items-center gap-2">
            <span className="text-muted-foreground hover:text-primary transition">/</span>

            <Link
              to={url}
              className={cn(
                "capitalize transition",
                isLast
                  ? "hover:text-muted-foreground text-primary transition"
                  : "text-muted-foreground hover:text-primary transition"
              )}
            >
              {item.replace("-", " ")}
            </Link>
          </div>
        );
      })}
    </div>
  );
};
