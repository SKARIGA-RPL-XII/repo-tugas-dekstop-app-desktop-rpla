import { useEffect, useMemo, useState } from "react";

type RangeType = "daily" | "monthly" | "yearly";

interface DashboardData {
  summary: {
    total_transactions: number;
    total_products: number;
    total_revenue: number;
  };
  chart: Array<{
    date: string;
    total: number;
  }>;
  latest_products: Array<{
    id: string;
    product_name: string;
    stock: number;
  }>;
  latest_transactions: Array<{
    id: string;
    invoice: string;
    date: string;
    cashier: string;
    total: number;
    item_count: number;
  }>;
}

interface UseDashboardParams {
  startDate?: string;
  endDate?: string;
  range?: RangeType;
}

export const useDashboard = (params?: UseDashboardParams) => {
  const [range, setRange] = useState<RangeType>(params?.range || "daily");
  const [startDate, setStartDate] = useState(params?.startDate || "2025-12-01");
  const [endDate, setEndDate] = useState(params?.endDate || "2025-12-31");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      setError(null);

      try {
        const queryParams = new URLSearchParams({
          range,
          start: startDate,
          end: endDate,
        });

        const res = await fetch(
          `http://localhost:3000/api/dashboard?${queryParams.toString()}`
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const json = await res.json();

        if (!json.success) {
          throw new Error(json.message || "Failed to fetch dashboard data");
        }

        setData(json.data);
      } catch (err: any) {
        setError(err.message || "An error occurred");
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [range, startDate, endDate]);

  const chartOptions = useMemo(
    () => ({
      chart: { type: "bar" as const, height: 248 },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          borderRadius: 5,
          borderRadiusApplication: "end" as const,
        },
      },
      dataLabels: { enabled: false },
      stroke: { show: true, width: 2, colors: ["transparent"] },
      xaxis: {
        categories: data?.chart?.map((item) => {
          const date = new Date(item.date);
          return date.toLocaleDateString("id-ID", {
            month: "short",
            day: "numeric",
          });
        }) || [],
      },
      fill: { opacity: 1 },
      colors: ["#5565FF"],
      tooltip: {
        y: {
          formatter: (value: number) => {
            return new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
            }).format(value);
          },
        },
      },
    }),
    [data?.chart]
  );

  const chartSeries = useMemo(
    () => [
      {
        name: "Total Penjualan",
        data: data?.chart?.map((item) => item.total) || [],
      },
    ],
    [data?.chart]
  );

  return {
    range,
    setRange,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    data,
    summary: data?.summary,
    chartData: data?.chart || [],
    latestProducts: data?.latest_products || [],
    latestTransactions: data?.latest_transactions || [],
    chartOptions,
    chartSeries,
    loading,
    error,
  };
};