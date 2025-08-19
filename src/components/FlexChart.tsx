"use client";

import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

type ChartType = "line" | "bar" | "area";

interface FlexChartProps<T> {
  data: T[];
  dataKey: keyof T;
  xKey: keyof T;
  type?: ChartType;
  title?: string;
  yFormatter?: (value: any) => string;
}

export function FlexChart<T>({
  data,
  dataKey,
  xKey,
  type = "line",
  title,
  yFormatter,
}: FlexChartProps<T>) {
  const sorted = [...data].sort(
    (a, b) => new Date(a[xKey] as any).getTime() - new Date(b[xKey] as any).getTime()
  );

  const renderChart = () => {
    switch (type) {
      case "bar":
        return <BarChartComponent data={sorted} dataKey={dataKey} />;
      case "area":
        return <AreaChartComponent data={sorted} dataKey={dataKey} />;
      case "line":
      default:
        return <LineChartComponent data={sorted} dataKey={dataKey} />;
    }
  };

  return (
    <div style={{ width: "100%", height: 400 }}>
      {title && <h3 style={{ textAlign: "center" }}>{title}</h3>}
      <ResponsiveContainer width="100%" height="100%">
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );

  function LineChartComponent({ data, dataKey }: any) {
    return (
      <LineChart data={data} margin={{ top: 20, right: 30, left: 80, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xKey as string} />
        <YAxis
          width={100}
          tickFormatter={(value) => (yFormatter ? yFormatter(value) : String(value))}
        />
        <Tooltip
          formatter={(value: any) => (yFormatter ? yFormatter(value) : String(value))}
        />
        <Line type="monotone" dataKey={dataKey as string} stroke="#2563eb" dot={false} />
      </LineChart>
    );
  }

  function BarChartComponent({ data, dataKey }: any) {
    return (
      <BarChart data={data} margin={{ top: 20, right: 30, left: 80, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xKey as string} />
        <YAxis
          width={100}
          tickFormatter={(value) => (yFormatter ? yFormatter(value) : String(value))}
        />
        <Tooltip
          formatter={(value: any) => (yFormatter ? yFormatter(value) : String(value))}
        />
        <Bar dataKey={dataKey as string} fill="#2563eb" />
      </BarChart>
    );
  }

  function AreaChartComponent({ data, dataKey }: any) {
    return (
      <AreaChart data={data} margin={{ top: 20, right: 30, left: 80, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xKey as string} />
        <YAxis
          width={100}
          tickFormatter={(value) => (yFormatter ? yFormatter(value) : String(value))}
        />
        <Tooltip
          formatter={(value: any) => (yFormatter ? yFormatter(value) : String(value))}
        />
        <Area
          type="monotone"
          dataKey={dataKey as string}
          stroke="#2563eb"
          fill="rgba(37,99,235,0.3)"
        />
      </AreaChart>
    );
  }
}
