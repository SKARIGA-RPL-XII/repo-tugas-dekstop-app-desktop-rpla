import { Link, useLocation } from "react-router-dom";
import { cn } from "../../utils/cn";
import { Home } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export const BreadCumb = () => {
  const { pathname } = useLocation();
  const { user } = useAuth();

  const isUUID = (str) =>
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);

  const segments = pathname
    .split("/")
    .filter(Boolean)
    .filter((s) => s !== user?.role)
    .filter((s) => !isUUID(s) && isNaN(Number(s))); // hide UUID & numeric id

  return (
    <div className="flex gap-1.5 items-center font-normal">
      <Link
        to={`/${user?.role}/dashboard`}
        className="text-muted-foreground flex items-center gap-1"
      >
        <Home size={13} /> Beranda
      </Link>

      {segments.map((item, i) => {
        const url = `/${user?.role}/` + segments.slice(0, i + 1).join("/");
        const isLast = i === segments.length - 1;

        return (
          <div key={item} className="flex items-center gap-2">
            <span className="text-muted-foreground">/</span>

            <Link
              to={url}
              className={cn(
                "capitalize transition",
                isLast
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              {item
                .replace("-", " ")
                .replace(/\b\w/g, (l) => l.toUpperCase())}
            </Link>
          </div>
        );
      })}
    </div>
  );
};
