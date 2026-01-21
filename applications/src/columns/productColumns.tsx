import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2, Eye } from "lucide-react";
import { Product } from "../types/product";
import { formatDate } from "../utils/formatDate";
import { Button } from "../components/UI/Button";
import { useNavigate } from "react-router-dom";
import imagesDumy from "../assets/images.png"

export const getProductColumns = ({
  openDelete,
  isLoading,
}: {
  openDelete: (product: Product) => void;
  isLoading: boolean;
}): ColumnDef<Product>[] => {
  const navigate = useNavigate();

  return [
    {
      id: "no",
      header: "#",
      cell: ({ row }) => row.index + 1,
    },

    {
      accessorKey: "product_name",
      header: "Nama Produk",
      cell: ({ row }) => {
        const product = row.original;

        return (
          <div className="flex items-center gap-3">
            <img
              src={product.url_image ?? imagesDumy}
              alt={product.product_name}
              className="w-10 h-10 rounded-md object-cover border border-muted-foreground"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://via.placeholder.com/40";
              }}
            />

            <div className="flex flex-col">
              <span className="font-medium text-gray-800">
                {product.product_name}
              </span>
              <span className="text-xs text-gray-400">
                Kode: {product.product_code}
              </span>
            </div>
          </div>
        );
      },
    },

    {
      header: "Kategori",
      cell: ({ row }) =>
        row.original.categories?.category_name ?? "-",
    },
    {
      accessorKey: "price",
      header: "Harga",
      cell: ({ row }) => (
        <span>Rp {row.original.price.toLocaleString("id-ID")}</span>
      ),
    },

    {
      accessorKey: "stock",
      header: "Stok",
      cell: ({ row }) => {
        const stock = row.original.stock;
        let color = "text-blue-600";
        if (stock === 0) color = "text-red-500";
        else if (stock <= 5) color = "text-orange-500";
        return <span className={`font-semibold ${color}`}>{stock}</span>;
      },
    },

    {
      accessorKey: "is_active",
      header: "Status",
      cell: ({ row }) =>
        row.original.is_active ? (
          <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
            Aktif
          </span>
        ) : (
          <span className="px-3 py-1 text-xs rounded-full bg-red-200 text-red-600">
            Non-Aktif
          </span>
        ),
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
        const product = row.original;

        return (
          <div className="flex items-center gap-2">
            {/* DETAIL */}
            <Button
              variant="outline"
              size="sm"
              className="text-blue-500 border-blue-400 w-8 h-8 p-2"
              onClick={() =>
                navigate(`/admin/produk/${product.id}/detail`)
              }
              disabled={isLoading}
            >
              <Eye size={15} />
            </Button>

            {/* EDIT */}
            <Button
              variant="outline"
              size="sm"
              className="text-orange-500 border-orange-400 w-8 h-8 p-2"
              onClick={() =>
                navigate(`/admin/produk/${product.id}/edit`)
              }
              disabled={isLoading}
            >
              <Pencil size={15} />
            </Button>

            {/* DELETE */}
            <Button
              variant="outline"
              size="sm"
              className="text-red-500 border-red-400 w-8 h-8 p-2"
              onClick={() => openDelete(product)}
              disabled={isLoading}
            >
              <Trash2 size={15} />
            </Button>

          </div>
        );
      },
    },
  ];
};
