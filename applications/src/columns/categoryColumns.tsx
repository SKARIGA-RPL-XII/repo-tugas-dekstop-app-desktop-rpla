import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import { Category } from "../types/category";
import { formatDate } from "../utils/formatDate";
import { Button } from "../components/UI/Button";

interface CategoryColumnsProps {
  openEdit: (category: Category) => void;
  openDelete: (category: Category) => void;
  isLoading: boolean;
}

export const getCategoryColumns = ({
  openEdit,
  openDelete,
  isLoading,
}: CategoryColumnsProps): ColumnDef<Category>[] => [
  { id: "no", header: "#", cell: ({ row }) => row.index + 1 },
  { accessorKey: "category_name", header: "Nama Kategori" },
  {
    accessorKey: "product_count",
    header: "Total Produk",
    cell: ({ row }) => `${row.original.product_count ?? 0} Produk`,
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
      const kategori = row.original;
      return (
        <div className="flex justify-start items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-orange-500 border-orange-400 hover:bg-orange-50 w-8 h-8 flex justify-center items-center p-0"
            onClick={() => openEdit(kategori)}
            disabled={isLoading}
          >
            <Pencil size={15} />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-red-500 border-red-400 hover:bg-red-50 w-8 h-8 flex justify-center items-center p-0"
            onClick={() => openDelete(kategori)}
            disabled={isLoading}
          >
            <Trash2 size={15} />
          </Button>
        </div>
      );
    },
  },
];
