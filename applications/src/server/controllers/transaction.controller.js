import { errorResponse, successResponse } from "../utils/response.js";
import { supabase } from "../config/supabase.js";

export class TransactionsController {
  static async createTransaction(req, res) {
    try {
      const { user_id, items } = req.body;

      if (!user_id || !Array.isArray(items) || items.length === 0) {
        return errorResponse(res, "user_id and items are required", 400);
      }

      const productIds = items.map(item => item.product_id);

      const { data: products, error: productError } = await supabase
        .from("products")
        .select("id, price, stock")
        .in("id", productIds)
        .eq("is_active", true);

      if (productError) throw productError;

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

      const detailPayload = transactionDetails.map(detail => ({
        ...detail,
        transaction_id: transaction.id
      }));

      const { error: detailError } = await supabase
        .from("transaction_detail")
        .insert(detailPayload);

      if (detailError) throw detailError;

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
  static async getTransactionDetail(req, res) {
  try {
    const { transaction_id } = req.params;

    if (!transaction_id) {
      return errorResponse(res, "transaction_id is required", 400);
    }

    const { data: transaction, error: transactionError } = await supabase
      .from("transactions")
      .select(`
        id,
        invoice_number,
        total_price,
        created_at,
        user_id
      `)
      .eq("id", transaction_id)
      .single();

    if (transactionError || !transaction) {
      return errorResponse(res, "Transaction not found", 404);
    }

    const { data: details, error: detailError } = await supabase
      .from("transaction_detail")
      .select(`
        id,
        qty,
        price,
        product:products (
          id,
          product_name
        )
      `)
      .eq("transaction_id", transaction_id);

    if (detailError) throw detailError;

    const items = details.map(item => ({
      product_id: item.product.id,
      product_name: item.product.product_name,
      qty: item.qty,
      price: item.price,
      subtotal: item.qty * item.price
    }));

    return successResponse(
      res,
      {
        transaction,
        items
      },
      "Success get transaction detail"
    );
  } catch (e) {
    return errorResponse(res, e.message, 400);
  }
}

}
