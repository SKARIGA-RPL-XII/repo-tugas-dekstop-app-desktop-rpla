export interface CashierCartItem {
  id: number;
  code: string;
  name: string;
  price: number;
  qty: number;
}

export interface CashierTransactionPayload {
  cashier_id: number;
  buyer_name?: string;
  payment_method: "cash" | "qris" | "transfer";
  paid_amount: number;
  total_amount: number;
  items: {
    product_id: number;
    price: number;
    qty: number;
    subtotal: number;
  }[];
}

export interface CashierTransactionResponse {
  id: number;
  invoice_number: string;
  total_amount: number;
  paid_amount: number;
  change_amount: number;
  created_at: string;
}

// <-- baru ditambahkan untuk validasi form
export interface CashierTransactionFormErrors {
  buyer_name?: string;
  payment_method?: string;
  paid_amount?: string;
  items?: string;
}
