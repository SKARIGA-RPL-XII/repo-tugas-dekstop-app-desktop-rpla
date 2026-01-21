import { useMutation } from "@tanstack/react-query";
import { CashierService } from "../../services/cashierService";
import type {
  CashierTransactionPayload,
  CashierTransactionResponse,
} from "../../types/cashier";

export const useCashier = () => {
  const submitTransactionMutation = useMutation<
    CashierTransactionResponse,
    Error,
    CashierTransactionPayload
  >({
    mutationFn: (payload) => CashierService.submitTransaction(payload),
  });

  return {
    submitTransaction: submitTransactionMutation.mutateAsync,
    loading: submitTransactionMutation.isLoading,
    error: submitTransactionMutation.error ?? null,
    success: submitTransactionMutation.isSuccess,
    data: submitTransactionMutation.data,
    reset: submitTransactionMutation.reset,
  };
};
