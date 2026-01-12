import { MenuGroup } from "../types/menuItems";
import { Icons } from "./icons";

export const menu: MenuGroup[] = [
  {
    title: "Beranda",
    items: [
      {
        label: "Beranda",
        path: "/dashboard",
        roles: ["admin", "cashier"],
        icon: <Icons.Dashboard />,
      },
    ],
  },
  {
    title: "Transaksi",
    items: [
      {
        label: "Kasir",
        path: "/dashboard-kasir",
        roles: ["cashier"],
        icon: <Icons.CashRegister />,
      },
      {
        label: "Riwayat Penjualan",
        path: "/riwayat-penjualan",
        roles: ["admin", "cashier"],
        icon: <Icons.History />,
      },
    ],
  },
  {
    title: "Produk",
    roles: ["admin"],
    items: [
      {
        label: "Kategori",
        path: "/kategori",
        icon: <Icons.Shapes />,
      },
      {
        label: "Produk",
        path: "/produk",
        icon: <Icons.Cart />,
      },
    ],
  },
  {
    title: "Akun",
    items: [
      {
        label: "Pengguna",
        path: "/pengguna",
        roles: ["admin"],
        icon: <Icons.Users />,
      },
      {
        label: "Profil Saya",
        path: "/profil-saya",
        icon: <Icons.User />,
      },
    ],
  },
];
