import { DashboardModel } from "../model/dashboard.model.js";
import { supabase } from "../config/supabase.js";

export class DashboardController {
  static async getDashboard(req, res) {
    try {
      const range = req.query.range || "monthly";

      const [
        summary,
        chart,
        latestProducts,
        latestTransactions,
      ] = await Promise.all([
        DashboardModel.getSummary(supabase),
        DashboardModel.getSalesChart(supabase, range),
        DashboardModel.getLatestProducts(supabase),
        DashboardModel.getLatestTransactions(supabase),
      ]);

      return res.json({
        success: true,
        data: {
          summary,
          chart,
          latest_products: latestProducts,
          latest_transactions: latestTransactions,
        },
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
}
