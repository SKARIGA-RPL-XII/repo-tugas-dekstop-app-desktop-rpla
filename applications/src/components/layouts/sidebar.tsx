import { NavLink } from "react-router-dom";
import Logo from "../../assets/logo.png";
import LogoCollapsed from "../../assets/logo-collapse.svg";
import { isElectron } from "../../utils/electron";

type MenuItem = {
  label: string;
  path: string;
  icon: JSX.Element;
};

type MenuGroup = {
  title: string;
  items: MenuItem[];
};

type SidebarProps = {
  collapsed: boolean;
  mobileOpen: boolean;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animateClass?: string;
};

const navClass = ({ isActive }: { isActive: boolean }) =>
  `sidebar-item ${isActive ? "active" : ""}`;

const menu: MenuGroup[] = [
  {
    title: "Beranda",
    items: [
      {
        label: "Beranda",
        path: "/admin/dashboard",
        icon: (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
            <path d="M6 2h6v6H6zM2 10h6v6H2zM10 10h6v6h-6z" />
          </svg>
        ),
      },
    ],
  },
  {
    title: "Transaksi",
    items: [
      {
        label: "Riwayat Penjualan",
        path: "/riwayat-penjualan",
        icon: (
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 9C8.175 9 7.46875 8.70625 6.88125 8.11875C6.29375 7.53125 6 6.825 6 6C6 5.175 6.29375 4.46875 6.88125 3.88125C7.46875 3.29375 8.175 3 9 3C9.825 3 10.5312 3.29375 11.1187 3.88125C11.7063 4.46875 12 5.175 12 6C12 6.825 11.7063 7.53125 11.1187 8.11875C10.5312 8.70625 9.825 9 9 9ZM3 13.5V12.9C3 12.475 3.1095 12.0845 3.3285 11.7285C3.5475 11.3725 3.838 11.1005 4.2 10.9125C4.975 10.525 5.7625 10.2345 6.5625 10.041C7.3625 9.8475 8.175 9.7505 9 9.75C9.825 9.7495 10.6375 9.8465 11.4375 10.041C12.2375 10.2355 13.025 10.526 13.8 10.9125C14.1625 11.1 14.4532 11.372 14.6722 11.7285C14.8912 12.085 15.0005 12.4755 15 12.9V13.5C15 13.9125 14.8533 14.2657 14.5597 14.5597C14.2662 14.8538 13.913 15.0005 13.5 15H4.5C4.0875 15 3.7345 14.8533 3.441 14.5597C3.1475 14.2662 3.0005 13.913 3 13.5Z"
              fill="#5E5E5E"
              fillOpacity="0.7"
            />
          </svg>
        ),
      },
    ],
  },
  {
    title: "Produk",
    items: [
      {
        label: "Kategori",
        path: "/admin/kategori",
        icon: (
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_226_407)">
              <path
                d="M8.36332 2.61L5.57332 7.17C5.26582 7.665 5.62582 8.31 6.21082 8.31H11.7833C12.3683 8.31 12.7283 7.665 12.4208 7.17L9.63832 2.61C9.34582 2.13 8.65582 2.13 8.36332 2.61Z"
                fill="#5E5E5E"
                fillOpacity="0.7"
              />
              <path
                d="M13.125 16.5586C14.989 16.5586 16.5 15.0476 16.5 13.1836C16.5 11.3196 14.989 9.80859 13.125 9.80859C11.261 9.80859 9.75 11.3196 9.75 13.1836C9.75 15.0476 11.261 16.5586 13.125 16.5586Z"
                fill="#5E5E5E"
                fillOpacity="0.7"
              />
              <path
                d="M3 16.125H7.5C7.9125 16.125 8.25 15.7875 8.25 15.375V10.875C8.25 10.4625 7.9125 10.125 7.5 10.125H3C2.5875 10.125 2.25 10.4625 2.25 10.875V15.375C2.25 15.7875 2.5875 16.125 3 16.125Z"
                fill="#5E5E5E"
                fillOpacity="0.7"
              />
            </g>
            <defs>
              <clipPath id="clip0_226_407">
                <rect width="18" height="18" fill="white" />
              </clipPath>
            </defs>
          </svg>
        ),
      },
      {
        label: "Produk",
        path: "/admin/produk",
        icon: (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
            <path d="M2 2h14l-2 10H4L2 2z" />
          </svg>
        ),
      },
    ],
  },
  {
    title: "Akun",
    items: [
      {
        label: "Pengguna",
        path: "/admin/pengguna",
        icon: (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
            <path d="M9 2a3 3 0 100 6 3 3 0 000-6zM3 14c0-3 3-4 6-4s6 1 6 4v1H3z" />
          </svg>
        ),
      },
      {
        label: "Profil Saya",
        path: "/profil-saya",
        icon: (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
            <path d="M9 9a3 3 0 100-6 3 3 0 000 6zM4 15c0-3 10-3 10 0v1H4z" />
          </svg>
        ),
      },
    ],
  },
];

const electron = isElectron();

const Sidebar = ({
  collapsed,
  mobileOpen,
  setMobileOpen,
  animateClass,
}: SidebarProps) => {
  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={`hidden md:flex fixed top-0 left-0 h-screen bg-white border-r border-[#EBF1F6] flex-col transition-all duration-300 ${
          collapsed ? "w-[100px]" : "w-[275px]"
        } ${animateClass ? animateClass : ""} ${electron ? "mt-10" : ""}`}
      >
        <div className="py-6 mb-6 flex justify-center">
          <img
            src={collapsed ? LogoCollapsed : Logo}
            alt="Logo"
            className={collapsed ? "w-[50px] h-[45px]" : "w-[215px] h-[45px]"}
          />
        </div>

        <nav className="w-full px-4 flex-1 space-y-6 text-[13px]">
          {menu.map((group) => (
            <div key={group.title}>
              <p
                className={`uppercase text-xs font-semibold mb-3 ${
                  collapsed ? "text-center text-[10px]" : "px-3"
                }`}
              >
                {group.title}
              </p>
              {group.items.map((item) => (
                <NavLink key={item.path} to={item.path} className={navClass}>
                  {item.icon}
                  {!collapsed && <span>{item.label}</span>}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="fixed top-0 left-0 w-[250px] h-screen bg-white border-r border-[#EBF1F6] flex flex-col p-4">
            <div className="py-6 mb-6 flex justify-center">
              <img src={Logo} alt="Logo" className="w-[215px] h-[45px]" />
            </div>
            <nav className="w-full flex-1 space-y-6 text-[13px]">
              {menu.map((group) => (
                <div key={group.title}>
                  <p className="uppercase text-xs font-semibold px-3 mb-3">
                    {group.title}
                  </p>
                  {group.items.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={navClass}
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </NavLink>
                  ))}
                </div>
              ))}
            </nav>
          </aside>
        </div>
      )}
    </>
  );
};

export default Sidebar;
