'use client';

import React, { useEffect, useState } from 'react';
import {LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer} from 'recharts';

interface Mtg30Record {
  Date: string;
  '30yr Mortgage Rate': number;
  Year: number;
  Month: number;
  Day: number;
}

const Mtg30RatesChart: React.FC = () => {
  const [data, setData] = useState<Mtg30Record[]>([]);
  const [startDate, setStartDate] = useState("2006-01-01");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = new URL("/api/mtg30", window.location.origin);
        url.searchParams.set("start_date", startDate);
        if (endDate) url.searchParams.set("end_date", endDate);

        const res = await fetch(url.toString());
        const json: Mtg30Record[] = await res.json();

        const sorted = json.sort(
          (a, b) => new Date(a.Date).getTime() - new Date(b.Date).getTime()
        );

        setData(sorted);
      } catch (err) {
        console.error("Failed to fetch 30yr mortgage rates data", err);
      }
    };

    fetchData();
  }, [startDate, endDate]);

  return (
    <div>
      <h1 className="text-center text-xl tracking-widest text-[#355e93] uppercase mb-4 pt-6">Mortgage Rates - 30yr</h1>

      {/* Date Filters */}
      <div className="flex justify-center gap-4 mb-4">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border rounded px-2 py-1"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border rounded px-2 py-1"
        />
      </div>

      <ResponsiveContainer className="mx-auto" width="90%" height={400}>
        <LineChart data={data} margin={{ top:10, left:30, right:30, bottom:30}}>
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
              `${value.toLocaleString()}%`
            }
          />
          <Tooltip
            formatter={(value: number) => `${value.toLocaleString()}%`}
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
            dataKey="30yr Mortgage Rate"
            stroke="#2563eb"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Mtg30RatesChart;
