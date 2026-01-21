import { errorResponse, successResponse } from "../utils/response.js";
import { supabase } from "../config/supabase.js";

export class TransactionsController {
  static async createTransaction(req, res) {
    try {
      const { user_id, items } = req.body;

      if (!user_id || !Array.isArray(items) || items.length === 0) {
        return errorResponse(res, "user_id and items are required", 400);
      }

      // 1. Ambil data product
      const productIds = items.map(item => item.product_id);

      const { data: products, error: productError } = await supabase
        .from("products")
        .select("id, price, stock")
        .in("id", productIds)

      if (productError) throw productError;

      // 2. Validasi & hitung total
      let total_price = 0;

      const transactionDetails = items.map(item => {
        const product = products.find(p => p.id === item.product_id);

        if (!product) {
          throw new Error(`Product not found: ${item.product_id}`);
        }

        if (product.stock < item.qty) {
          throw new Error(`Stock not enough for product ${item.product_id}`);
        }

        const subtotal = product.price * item.qty;
        total_price += subtotal;

        return {
          product_id: item.product_id,
          qty: item.qty,
          price: product.price
        };
      });

      // 3. Insert transactions
      const invoice_number = `INV-${Date.now()}`;

      const { data: transaction, error: transactionError } = await supabase
        .from("transactions")
        .insert({
          user_id,
          invoice_number,
          total_price
        })
        .select()
        .single();

      if (transactionError) throw transactionError;

      // 4. Insert transaction_detail
      const detailPayload = transactionDetails.map(detail => ({
        ...detail,
        transaction_id: transaction.id
      }));

      const { error: detailError } = await supabase
        .from("transaction_detail")
        .insert(detailPayload);

      if (detailError) throw detailError;

      // 5. Update stock product
      for (const item of transactionDetails) {
        await supabase.rpc("decrease_stock", {
          p_product_id: item.product_id,
          p_qty: item.qty
        });
      }

      return successResponse(res, transaction, "Transaction created successfully");
    } catch (e) {
      return errorResponse(res, e.message, 400);
    }
  }
}
