import ApiClient from "../utils/apiClient";
import {
  CashierTransactionPayload,
  CashierTransactionResponse,
} from "../types/cashier";

export class CashierService {
  /**
   * Simpan transaksi kasir (checkout)
   */
  static async submitTransaction(
    payload: CashierTransactionPayload
  ): Promise<CashierTransactionResponse> {
    const response = await ApiClient.post("/transaction/create", payload);
    return response.data.data;
  }
}
