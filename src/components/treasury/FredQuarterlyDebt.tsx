import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface NationalDebtEntry {
  Date: string;
  "National Debt": number;
}

async function fetchDebtData(): Promise<NationalDebtEntry[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || ""}/data/fred_quarterly_debt.json`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

export default async function FredQuarterlyDebtChart() {
  const data = await fetchDebtData();

  // Sort by date ascending
  const sortedData = [...data].sort(
    (a, b) => new Date(a.Date).getTime() - new Date(b.Date).getTime()
  );

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={sortedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="Date"
          tickFormatter={(str) => {
            const date = new Date(str);
            return `${date.getFullYear()}`;
          }}
          tick={{ fontSize: 12 }}
        />
        <YAxis
          tickFormatter={(val) => `${(val / 1000).toFixed(0)}K`}
          tick={{ fontSize: 12 }}
        />
        <Tooltip
          formatter={(value: number) =>
            value.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 })
          }
          labelFormatter={(label) => {
            const date = new Date(label);
            return date.toLocaleDateString();
          }}
        />
        <Line
          type="monotone"
          dataKey="National Debt"
          stroke="#413ea0"
          strokeWidth={2}
          dot={false}
          name="National Debt"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
