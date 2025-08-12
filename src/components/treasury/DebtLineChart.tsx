"use client"; // if using Next.js app router, client component needed

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

interface DebtEntry {
  date: string; // formatted MM/DD/YYYY
  public_debt: number;
  intragovernmental: number;
  total_debt: number;
  pub_date: string; // original date format from source
}

interface Props {
  data: DebtEntry[];
}

export default function DebtLineChart({ data }: Props) {
  // Convert date strings to something more readable or just use as is
  // Optionally reverse data if it's newest first
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={sortedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
        <YAxis
          tickFormatter={(value) => (value / 1e12).toFixed(1) + "T"} // show trillions on y-axis
          tick={{ fontSize: 12 }}
        />
        <Tooltip
          formatter={(value: number) =>
            value.toLocaleString("en-US", { style: "currency", currency: "USD" })
          }
          labelFormatter={(label) => `Date: ${label}`}
        />
        <Line
          type="monotone"
          dataKey="total_debt"
          stroke="#ff7300"
          strokeWidth={2}
          dot={false}
          name="Total Public Debt"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
