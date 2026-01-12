export type MenuItem = {
  label: string;
  path: string;
  icon: JSX.Element;
  roles?: string[];
};

export type MenuGroup = {
  title: string;
  items: MenuItem[];
  roles?: string[];
};

export type SidebarProps = {
  collapsed: boolean;
  mobileOpen: boolean;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animateClass?: string;
};