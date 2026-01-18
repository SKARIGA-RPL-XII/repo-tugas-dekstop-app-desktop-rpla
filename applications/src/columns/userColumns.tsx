import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2, Eye } from "lucide-react";
import { User } from "../types/user";
import { formatDate } from "../utils/formatDate";
import { Button } from "../components/UI/Button";

interface UserColumnsProps {
  openEdit: (user: User) => void;
    openDelete: (user: User) => void;
    openDetail: (user: User) => void;
  isLoading: boolean;
}

export const getUserColumns = ({
  openEdit,
  openDelete,
  isLoading,
}: UserColumnsProps): ColumnDef<User>[] => [
  {
    id: "no",
    header: "#",
    cell: ({ row }) => row.index + 1,
  },

  {
    accessorKey: "username",
    header: "Username",
  },

  {
    accessorKey: "email",
    header: "Email",
  },

  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.original.role;
      return (
        <span className="px-2 py-1 text-xs rounded-md bg-blue-100 text-blue-700 capitalize">
          {role}
        </span>
      );
    },
  },

  {
    accessorKey: "is_blocked",
    header: "Status",
    cell: ({ row }) => {
      const isBlocked = row.original.is_blocked;
      return isBlocked ? (
        <span className="px-2 py-1 text-xs rounded-md bg-red-100 text-red-700">
          Diblokir
        </span>
      ) : (
        <span className="px-2 py-1 text-xs rounded-md bg-green-100 text-green-700">
          Aktif
        </span>
      );
    },
  },

  {
    accessorKey: "created_at",
    header: "Dibuat Tanggal",
    cell: ({ row }) => formatDate(row.original.created_at),
  },

  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className="flex justify-start items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-blue-500 border-blue-400 hover:bg-red-50 w-8 h-8 flex justify-center items-center p-0"
            onClick={() => openDetail(user)}
            disabled={isLoading}
          >
            <Eye size={15} />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-orange-500 border-orange-400 hover:bg-orange-50 w-8 h-8 flex justify-center items-center p-0"
            onClick={() => openEdit(user)}
            disabled={isLoading}
          >
            <Pencil size={15} />
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="text-red-500 border-red-400 hover:bg-red-50 w-8 h-8 flex justify-center items-center p-0"
            onClick={() => openDelete(user)}
            disabled={isLoading}
          >
            <Trash2 size={15} />
          </Button>
        </div>
      );
    },
  },
];
