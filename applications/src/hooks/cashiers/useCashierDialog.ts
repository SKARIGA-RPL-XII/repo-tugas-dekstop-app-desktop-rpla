import { useState } from "react";
import type {
  CashierCartItem,
  CashierTransactionPayload,
  CashierTransactionFormErrors,
} from "../../types/cashier";
import { ApiError } from "../../types/Api";

interface UseCashierDialogProps {
  cashierId: number; // harus dari user login
}

export function useCashierDialog({ cashierId }: UseCashierDialogProps) {
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState<CashierCartItem[]>([]);
  const [buyerName, setBuyerName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "qris" | "transfer">(
    "cash"
  );
  const [paidAmount, setPaidAmount] = useState(0);
  const [errors, setErrors] = useState<CashierTransactionFormErrors>({});

  /** Open dialog */
  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);

  /** Cart actions */
  const addToCart = (product: CashierCartItem) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const increaseQty = (id: number) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty: item.qty + 1 } : item))
    );
  };

  const decreaseQty = (id: number) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const removeItem = (id: number) => setCart((prev) => prev.filter((i) => i.id !== id));
  const clearCart = () => setCart([]);

  /** Total calculation */
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const changeAmount = paidAmount - totalAmount > 0 ? paidAmount - totalAmount : 0;

  /** Form field setters */
  const setFormField = (
    field: keyof Omit<CashierTransactionPayload, "cashier_id" | "total_amount" | "items">,
    value: string | number
  ) => {
    switch (field) {
      case "buyer_name":
        setBuyerName(value as string);
        setErrors((prev) => ({ ...prev, buyer_name: undefined }));
        break;
      case "payment_method":
        setPaymentMethod(value as "cash" | "qris" | "transfer");
        setErrors((prev) => ({ ...prev, payment_method: undefined }));
        break;
      case "paid_amount":
        setPaidAmount(Number(value));
        setErrors((prev) => ({ ...prev, paid_amount: undefined }));
        break;
    }
  };

  /** Submit handler with validation */
  const submit = async (
    onValid: (payload: CashierTransactionPayload) => Promise<void>
  ) => {
    const fieldErrors: CashierTransactionFormErrors = {};
    if (!cart.length) {
      fieldErrors.items = "Keranjang tidak boleh kosong";
    }
    if (paidAmount < totalAmount) {
      fieldErrors.paid_amount = "Jumlah dibayarkan kurang dari total";
    }

    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return false;
    }

    try {
      await onValid({
        cashier_id: cashierId, // ambil dari props
        buyer_name: buyerName,
        payment_method: paymentMethod,
        paid_amount: paidAmount,
        total_amount: totalAmount,
        items: cart.map((item) => ({
          product_id: item.id,
          price: item.price,
          qty: item.qty,
          subtotal: item.price * item.qty,
        })),
      });

      // reset setelah submit
      clearCart();
      setBuyerName("");
      setPaidAmount(0);
      setPaymentMethod("cash");
      setErrors({});
      return true;
    } catch (err) {
      const error = err as ApiError;
      if (Array.isArray(error.response?.data?.message)) {
        error.response.data.message.forEach(
          (e: { path: string; message: string }) => {
            fieldErrors[e.path as keyof CashierTransactionFormErrors] = e.message;
          }
        );
      } else if (typeof error.response?.data?.message === "string") {
        fieldErrors.paid_amount = error.response.data.message;
      }
      setErrors(fieldErrors);
      return false;
    }
  };

  return {
    open,
    openDialog,
    closeDialog,
    cart,
    addToCart,
    increaseQty,
    decreaseQty,
    removeItem,
    clearCart,
    buyerName,
    paymentMethod,
    paidAmount,
    totalAmount,
    changeAmount,
    setFormField,
    errors,
    submit,
  };
}
