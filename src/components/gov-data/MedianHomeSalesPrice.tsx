"use client";

import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface MSPRecord {
  Date: string;
  "Median Home Sales Price": number;
  Year: number;
  Month: number;
  Day: number;
}

const MedianHomeSalesPriceChart: React.FC = () => {
  const [data, setData] = useState<MSPRecord[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/mspus");
        const json: MSPRecord[] = await res.json();

        // Sort by date, just in case
        const sorted = json.sort(
          (a, b) => new Date(a.Date).getTime() - new Date(b.Date).getTime()
        );

        setData(sorted);
      } catch (err) {
        console.error("Failed to fetch median home sales price data", err);
      }
    };

    fetchData();
  }, []);

  return (
    <ResponsiveContainer className="mx-auto" width="90%" height={400}>
      <LineChart data={data} margin={{ top:30, left:30, right:30, bottom:30}}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="Date"
          tickFormatter={(dateStr) => {
            const d = new Date(dateStr);
            return `${d.toLocaleString("default", { month: "short" })} ${d.getFullYear()}`;
          }}
        />
        <YAxis
          tickFormatter={(value) =>
            `$${value.toLocaleString()}`
          }
        />
        <Tooltip
          formatter={(value: number) => `$${value.toLocaleString()}`}
          labelFormatter={(dateStr) => {
            const d = new Date(dateStr);
            return d.toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
            });
          }}
        />
        <Line
          type="monotone"
          dataKey="Median Home Sales Price"
          stroke="#2563eb"
          strokeWidth={3}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MedianHomeSalesPriceChart;
