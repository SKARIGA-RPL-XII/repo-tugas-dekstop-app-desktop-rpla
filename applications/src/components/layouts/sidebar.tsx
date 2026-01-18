import { NavLink } from "react-router-dom";
import Logo from "../../assets/logo.png";
import LogoCollapsed from "../../assets/logo-collapse.svg";
import { isElectron } from "../../utils/electron";
import { useAuth } from "../../context/AuthContext";
import { MenuGroup, SidebarProps } from "../../types/menuItems";
import { menu } from "../../configs/menu"; 

const Sidebar = ({
  collapsed,
  mobileOpen,
  setMobileOpen,
  animateClass,
}: SidebarProps) => {
  const { user } = useAuth();
  const electron = isElectron();
  const navClass = ({ isActive }: { isActive: boolean }) =>
    `sidebar-item ${isActive ? "active" : ""}`;

  function getMenuByRole(userRole: string): MenuGroup[] {
    return menu
      .map((group) => {
        if (group.roles && !group.roles.includes(userRole)) {
          return null;
        }

        return {
          ...group,
          items: group.items.filter(
            (item) => !item.roles || item.roles.includes(userRole)
          ),
        };
      })
      .filter(
        (group): group is MenuGroup => group !== null && group.items.length > 0
      );
  }

  const filteredMenu = user ? getMenuByRole(user.role) : [];

  return (
    <>
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
          {filteredMenu.map((group) => (
            <div key={group.title}>
              <p
                className={`uppercase text-xs font-semibold mb-3 ${
                  collapsed ? "text-center text-[10px]" : "px-3"
                }`}
              >
                {group.title}
              </p>
              {group.items.map((item , _) => (
                <NavLink key={_ + 1} to={`/${user.role}/${item.path}`} className={navClass}>
                  {item.icon}
                  {!collapsed && <span>{item.label}</span>}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>
      </aside>

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
              {filteredMenu.map((group) => (
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
