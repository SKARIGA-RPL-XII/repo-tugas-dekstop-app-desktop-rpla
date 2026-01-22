export class DashboardModel {
  static async getSummary(db) {
    const { data, error } = await db.rpc("dashboard_summary");
    if (error) throw new Error(error.message);
    return data;
  }

  static async getSalesChart(db, range = "monthly") {
    const { data, error } = await db.rpc("dashboard_sales_chart", {
      range_type: range,
    });
    if (error) throw new Error(error.message);
    return data;
  }

  static async getLatestProducts(db, limit = 4) {
    const { data, error } = await db
      .from("products")
      .select("id, product_name, stock")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) throw new Error(error.message);
    return data ?? [];
  }

  static async getLatestTransactions(db, limit = 5) {
    const { data, error } = await db
      .from("transactions")
      .select(`
        id,
        invoice_number,
        created_at,
        total_price,
        users ( username ),
        transaction_detail ( qty )
      `)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) throw new Error(error.message);

    return (data ?? []).map((tr) => ({
      id: tr.id,
      invoice: tr.invoice_number,
      date: tr.created_at,
      cashier: tr.users?.username ?? "-",
      total: tr.total_price,
      item_count: tr.transaction_detail?.reduce(
        (sum, item) => sum + item.qty,
        0
      ),
    }));
  }
}
