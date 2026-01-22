import { errorResponse, successResponse } from "../utils/response.js";
import { supabase } from "../config/supabase.js";

export class TransactionsController {
  static async createTransaction(req, res) {
    try {
      const { user_id, items, payment_amount, payment_method } = req.body;

      // Validasi dasar
      if (
        !user_id ||
        !Array.isArray(items) ||
        items.length === 0 ||
        payment_amount == null ||
        !payment_method
      ) {
        return errorResponse(
          res,
          "user_id, items, payment_amount, and payment_method are required",
          400,
        );
      }

      const productIds = items.map((item) => item.product_id);

      const { data: products, error: productError } = await supabase
        .from("products")
        .select("id, price, stock")
        .in("id", productIds);

      if (productError) throw productError;

      let total_price = 0;

      const transactionDetails = items.map((item) => {
        const product = products.find((p) => p.id === item.product_id);

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
          price: product.price,
        };
      });

      // Optional: validasi pembayaran
      if (payment_amount < total_price) {
        return errorResponse(res, "Jumlah bayar kurang", 400);
      }

      const invoice_number = `INV-${Date.now()}`;

      const { data: transaction, error: transactionError } = await supabase
        .from("transactions")
        .insert({
          user_id,
          invoice_number,
          total_price,
          payment_amount,
          payment_method,
        })
        .select()
        .single();

      if (transactionError) throw transactionError;

      const detailPayload = transactionDetails.map((detail) => ({
        ...detail,
        transaction_id: transaction.id,
      }));

      const { error: detailError } = await supabase
        .from("transaction_detail")
        .insert(detailPayload);

      if (detailError) throw detailError;

      // Kurangi stok
      for (const item of transactionDetails) {
        await supabase.rpc("decrease_stock", {
          p_product_id: item.product_id,
          p_qty: item.qty,
        });
      }

      return successResponse(
        res,
        transaction,
        "Transaction created successfully",
      );
    } catch (e) {
      return errorResponse(res, e.message, 400);
    }
  }

  static async getTransaction(req, res) {
    try {
      const { transaction_id } = req.params;

      let query = supabase.from("transactions").select(`
      id,
      invoice_number,
      total_price,
      payment_method,
      created_at,
      user_id,
      user:users (
        id,
        username
      ),
      transaction_detail (
        id,
        qty,
        price,
        product:products (
          id,
          product_name
        )
      )
    `);

      // 👉 kalau ada param → ambil 1 transaksi
      if (transaction_id) {
        query = query.eq("id", transaction_id).single();
      }

      const { data, error } = await query;

      if (error) {
        return errorResponse(res, error.message, 400);
      }

      // 👉 jika ambil 1 transaksi
      if (transaction_id) {
        if (!data) {
          return errorResponse(res, "Transaction not found", 404);
        }

        const items = data.transaction_detail.map((item) => ({
          product_id: item.product.id,
          product_name: item.product.product_name,
          qty: item.qty,
          price: item.price,
          subtotal: item.qty * item.price,
        }));

        return successResponse(
          res,
          {
            id: data.id,
            invoice_number: data.invoice_number,
            total_price: data.total_price,
            payment_method: data.payment_method,
            created_at: data.created_at,
            user: {
              id: data.user_id,
              username: data.user?.username,
            },
            items,
          },
          "Success get transaction detail",
        );
      }

      // 👉 jika TANPA param → ambil semua transaksi
      const transactions = data.map((trx) => ({
        id: trx.id,
        invoice_number: trx.invoice_number,
        total_price: trx.total_price,
        payment_method: trx.payment_method,
        created_at: trx.created_at,
        cashier: {
          id: trx.user_id,
          username: trx.user?.username,
        },
        items: trx.transaction_detail.map((item) => ({
          product_id: item.product.id,
          product_name: item.product.product_name,
          qty: item.qty,
          price: item.price,
          subtotal: item.qty * item.price,
        })),
      }));

      return successResponse(res, transactions, "Success get transactions");
    } catch (e) {
      return errorResponse(res, e.message, 500);
    }
  }
}
