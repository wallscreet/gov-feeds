"use client";
import React, { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface DebtRecord {
  record_date: string;
  debt_held_public_amt: string;
  intragov_hold_amt: string;
  tot_pub_debt_out_amt: string;
}

interface DebtRecordParsed {
  record_date: string;
  debt_held_public_amt: number;
  intragov_hold_amt: number;
  tot_pub_debt_out_amt: number;
}

export default function DebtToThePenny() {
  const [data, setData] = useState<DebtRecordParsed[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDebtData() {
      try {
        const res = await fetch(
          "https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/debt_to_penny?page[size]=10000"
        );
        const json = await res.json();

        const parsedData: DebtRecordParsed[] = json.data.map((d: DebtRecord) => ({
          record_date: d.record_date,
          debt_held_public_amt: Number(d.debt_held_public_amt),
          intragov_hold_amt: Number(d.intragov_hold_amt),
          tot_pub_debt_out_amt: Number(d.tot_pub_debt_out_amt),
        }));

        // sort newest first
        const sorted = parsedData.sort((a, b) => (b.record_date > a.record_date ? 1 : -1));
        setData(sorted);
      } catch (error) {
        console.error("Error fetching Debt to the Penny data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDebtData();
  }, []);

  const columns: ColumnDef<DebtRecordParsed>[] = [
    {
      header: "Date",
      accessorKey: "record_date",
      cell: (info) =>
        new Date(info.getValue() as string).toLocaleDateString("en-US"),
    },
    {
      header: "Public Debt",
      accessorKey: "debt_held_public_amt",
      cell: (info) =>
        (info.getValue() as number).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 2,
        }),
    },
    {
      header: "Intragov Holdings",
      accessorKey: "intragov_hold_amt",
      cell: (info) =>
        (info.getValue() as number).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 2,
        }),
    },
    {
      header: "Total Debt",
      accessorKey: "tot_pub_debt_out_amt",
      cell: (info) =>
        (info.getValue() as number).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 2,
        }),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  });

  if (loading) return <p className="text-center py-10">Loading Debt to the Penny...</p>;

  const latestDebt = data[0]?.tot_pub_debt_out_amt ?? 0;

  return (
    <div className="p-6 space-y-6 mt-4">

      {/* Current Total Debt */}
      <div className="space-y-1">
        {data[0] && (
          <div className="text-sm text-slate-800 text-center mb-1">
            As Of: {new Date(data[0].record_date).toLocaleDateString("en-US")}
          </div>
        )}
        <div className="text-xl md:text-3xl font-semibold text-red-600 text-center">
          {" "}
          {latestDebt.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
          })}
        </div>
      </div>

      {/* Line Chart */}
      <div className="w-full h-72 md:h-96 shadow-lg">
        <ResponsiveContainer>
          <LineChart data={[...data].reverse()}>
            <CartesianGrid strokeDasharray="4 4" />
            <XAxis
              dataKey="record_date"
              tickFormatter={(date) => new Date(date).getFullYear().toString()}
              minTickGap={40}
            />
            <YAxis
              tickFormatter={(value) => `$${(value / 1_000_000_000_000).toFixed(1)}T`}
            />
            <Tooltip
              formatter={(value: number) =>
                value.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                })
              }
              labelFormatter={(date) =>
                new Date(date).toLocaleDateString("en-US")
              }
            />
            <Line
              type="monotone"
              dataKey="tot_pub_debt_out_amt"
              stroke="#2563eb"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex justify-end space-x-1">
        {/* Export JSON Button */}
        <div className="flex justify-end">
          <button
            onClick={() => {
              const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
              const url = URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.href = url;
              link.download = "us_debt_to_the_penny.json";
              link.click();
              URL.revokeObjectURL(url);
            }}
            className="px-4 py-2 bg-blue-900 text-white font-semibold rounded-xl shadow-lg hover:bg-[#2596be] transition"
          >
            Export JSON
          </button>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
        
        {/* Export CSV */}
        <button
          onClick={() => {
            if (!data.length) return;

            // Extract headers
            const headers = Object.keys(data[0]).join(",");

            // Extract rows
            const rows = data
              .map((row) =>
                Object.values(row)
                  .map((val) => `"${String(val).replace(/"/g, '""')}"`) // CSV-safe
                  .join(",")
              )
              .join("\n");

            // Build CSV
            const csvContent = [headers, rows].join("\n");

            const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "us_debt_to_the_penny.csv";
            link.click();
            URL.revokeObjectURL(url);
          }}
          className="px-4 py-2 bg-blue-900 text-white font-semibold rounded-xl shadow-lg hover:bg-[#2596be] transition"
        >
          Export CSV
        </button>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent mb-8 mt-8"></div>

      {/* Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-lg">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-2 text-left font-medium text-gray-700"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-100">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-2 text-gray-800 whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-2">
        <div className="flex gap-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 bg-blue-900 rounded-xl disabled:opacity-50 hover:bg-[#2596be] text-white transition font-semibold"
          >
            Previous
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 bg-blue-900 rounded-xl disabled:opacity-50 hover:bg-[#2596be] text-white transition font-semibold"
          >
            Next
          </button>
        </div>
        <span className="text-slate-800">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
      </div>
  </div>
)
}
