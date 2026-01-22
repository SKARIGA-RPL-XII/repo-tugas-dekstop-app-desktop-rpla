import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { Button } from "../components/UI/Button";
import { formatDate } from "../utils/formatDate";

/**
 * contoh tipe data transaksi
 * silakan sesuaikan sama response backend
 */
export interface Transaction {
  id: number;
  invoice: string;
  total: number;
  payment_method: string;
  status: "paid" | "pending" | "failed";
  created_at: string;
}

interface TransactionColumnsProps {
  openDetail: (trx: Transaction) => void;
  isLoading: boolean;
}

export const getTransactionColumns = ({
  openDetail,
  isLoading,
}: TransactionColumnsProps): ColumnDef<Transaction>[] => [
  {
    id: "no",
    header: "#",
    cell: ({ row }) => row.index + 1,
  },

  {
    accessorKey: "invoice_number",
    header: "Invoice",
  },


  {
    accessorKey: "created_at",
    header: "Tanggal Transaksi",
    cell: ({ row }) => {
      const created_at = row.original.created_at;
      return (
        <span className="font-semibold">
          {formatDate(created_at)}
        </span>
      );
    },
  },

  {
    accessorKey: "cashier",
    header: "Nama kasir",
    cell: ({ row }) => {
      const cashier = row.original.cashier.username;
      return (
        <span className="font-semibold">
          {cashier}
        </span>
      );
    },
  },

  {
    accessorKey: "qty",
    header: "Jumlah Items",
    cell: ({ row }) => {
      const qty = row.original.items[0].qty;
      return (
        <span className="font-semibold">
          {qty}
        </span>
      );
    },
  },

  {
    accessorKey: "total_price",
    header: "Total Harga",
    cell: ({ row }) => {
      const total_price = row.original.total_price;
      return (
        <span className="font-semibold">
          Rp {total_price}
        </span>
      );
    },
  },

  {
    accessorKey: "payment_method",
    header: "Metode Bayar",
    cell: ({ row }) => (
      <span className="capitalize">
        {row.original.payment_method}
      </span>
    ),
  },

  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const trx = row.original;

      return (
        <Button
          variant="outline"
          size="sm"
          className="text-blue-500 border-blue-400 hover:bg-blue-50 w-8 h-8 flex justify-center items-center p-0"
          onClick={() => openDetail(trx)}
          disabled={isLoading}
        >
          <Eye size={15} />
        </Button>
      );
    },
  },
];
