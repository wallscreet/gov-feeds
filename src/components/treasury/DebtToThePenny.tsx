// "use client";
// import React, { useEffect, useState } from "react";

// import {
//   useReactTable,
//   getCoreRowModel,
//   getPaginationRowModel,
//   ColumnDef,
//   flexRender,
// } from "@tanstack/react-table";

// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   ResponsiveContainer,
// } from "recharts";

// interface DebtRecord {
//   record_date: string;
//   total_public_debt_outstanding: string;
// }

// export default function DebtToThePenny() {
//   const [data, setData] = useState<DebtRecord[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchDebtData() {
//       try {
//         const res = await fetch(
//           "https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/debt_to_penny?page[size]=10000"
//         );
//         const json = await res.json();

//         // Sort by most recent first for the table
//         const sorted = [...json.data].sort(
//             (a, b) =>
//             new Date(b.record_date).getTime() -
//             new Date(a.record_date).getTime()
//         );

//         setData(sorted);
//       } catch (error) {
//         console.error("Error fetching Debt to the Penny data:", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchDebtData();
//   }, []);

//   const columns: ColumnDef<DebtRecord>[] = [
//     {
//       header: "Date",
//       accessorKey: "record_date",
//       cell: (info) =>
//         new Date(info.getValue() as string).toLocaleDateString("en-US"),
//     },
//     {
//       header: "Public Debt",
//       accessorKey: "debt_held_public_amt",
//       cell: (info) =>
//         Number(info.getValue()).toLocaleString("en-US", {
//           style: "currency",
//           currency: "USD",
//           maximumFractionDigits: 2,
//         }),
//     },
//     {
//         header: "Intragovernmental Holdings",
//         accessorKey: "intragov_hold_amt",
//         cell: (info) =>
//             Number(info.getValue()).toLocaleString("en-US", {
//             style: "currency",
//             currency: "USD",
//             maximumFractionDigits: 2,
//         }),
//     },
//     {
//       header: "Total Debt (USD)",
//       accessorKey: "tot_pub_debt_out_amt",
//       cell: (info) =>
//         Number(info.getValue()).toLocaleString("en-US", {
//           style: "currency",
//           currency: "USD",
//           maximumFractionDigits: 2,
//         }),
//     },
//   ];

//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//   });

//   if (loading) return <p>Loading Debt to the Penny data...</p>;

//   return (
//     <div className="p-6 space-y-8">
//       <h2 className="text-2xl text-[#355e93] font-bold mb-4">Total Debt Over Time</h2>

//       {/* Line Chart */}
//       <div className="w-full h-96">
//         <ResponsiveContainer>
//           <LineChart data={[...data].reverse()}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis
//               dataKey="record_date"
//               tickFormatter={(date) =>
//                 new Date(date).getFullYear().toString()
//               }
//               minTickGap={40}
//             />
//             <YAxis
//               tickFormatter={(value) =>
//                 `$${(value / 1_000_000_000_000).toFixed(1)}T`
//               }
//             />
//             <Tooltip
//               formatter={(value: string) =>
//                 Number(value).toLocaleString("en-US", {
//                   style: "currency",
//                   currency: "USD",
//                   maximumFractionDigits: 0,
//                 })
//               }
//               labelFormatter={(date) =>
//                 new Date(date).toLocaleDateString("en-US")
//               }
//             />
//             <Line
//               type="monotone"
//               dataKey="tot_pub_debt_out_amt"
//               stroke="#2563eb"
//               strokeWidth={2}
//               dot={false}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto border rounded-lg shadow">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-100">
//             {table.getHeaderGroups().map((headerGroup) => (
//               <tr key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => (
//                   <th
//                     key={header.id}
//                     className="px-4 py-2 text-left text-sm font-medium text-gray-700"
//                   >
//                     {header.isPlaceholder
//                       ? null
//                       : flexRender(
//                           header.column.columnDef.header,
//                           header.getContext()
//                         )}
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {table.getRowModel().rows.map((row) => (
//               <tr key={row.id}>
//                 {row.getVisibleCells().map((cell) => (
//                   <td
//                     key={cell.id}
//                     className="px-4 py-2 whitespace-nowrap text-sm text-gray-800"
//                   >
//                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination Controls */}
//       <div className="flex justify-between items-center mt-4">
//         <button
//           onClick={() => table.previousPage()}
//           disabled={!table.getCanPreviousPage()}
//           className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
//         >
//           Previous
//         </button>
//         <span>
//           Page {table.getState().pagination.pageIndex + 1} of{" "}
//           {table.getPageCount()}
//         </span>
//         <button
//           onClick={() => table.nextPage()}
//           disabled={!table.getCanNextPage()}
//           className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }

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

export default function DebtToThePenny() {
  const [data, setData] = useState<DebtRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDebtData() {
      try {
        const res = await fetch(
          "https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/debt_to_penny?page[size]=10000"
        );
        const json = await res.json();

        // Sort using string comparison on YYYY-MM-DD to avoid timezone issues
        const sorted = [...json.data].sort(
          (a, b) => (b.record_date > a.record_date ? 1 : -1)
        );

        setData(sorted);
      } catch (error) {
        console.error("Error fetching Debt to the Penny data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDebtData();
  }, []);

  const columns: ColumnDef<DebtRecord>[] = [
    {
      header: "Date",
      accessorKey: "record_date",
      // cell: (info) =>
      //   new Date(info.getValue() as string).toLocaleDateString("en-US"),
      cell: (info) => {
        const dateStr = info.getValue() as string;
        const [year, month, day] = dateStr.split('-').map(Number);
        return new Date(year, month - 1, day).toLocaleDateString("en-US");
      },
    },
    {
      header: "Public Debt",
      accessorKey: "debt_held_public_amt",
      cell: (info) =>
        Number(info.getValue()).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 2,
        }),
    },
    {
      header: "Intragovernmental Holdings",
      accessorKey: "intragov_hold_amt",
      cell: (info) =>
        Number(info.getValue()).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 2,
        }),
    },
    {
      header: "Total Debt (USD)",
      accessorKey: "tot_pub_debt_out_amt",
      cell: (info) =>
        Number(info.getValue()).toLocaleString("en-US", {
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
  });

  if (loading) return <p>Loading Debt to the Penny data...</p>;

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl text-[#355e93] font-bold mb-4">Total Debt Over Time</h2>

      {/* Line Chart */}
      <div className="w-full h-96">
        <ResponsiveContainer>
          <LineChart data={[...data].reverse()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="record_date"
              tickFormatter={(date) =>
                new Date(date).getFullYear().toString()
              }
              minTickGap={40}
            />
            <YAxis
              tickFormatter={(value) =>
                `$${(value / 1_000_000_000_000).toFixed(1)}T`
              }
            />
            <Tooltip
              formatter={(value: string) =>
                Number(value).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                })
              }
              // labelFormatter={(date) =>
              //   new Date(date).toLocaleDateString("en-US")
              // }
              labelFormatter={(date) => {
                const [year, month, day] = date.split('-').map(Number);
                return new Date(year, month - 1, day).toLocaleDateString("en-US");
              }}
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

      {/* Table */}
      <div className="overflow-x-auto border rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-2 text-left text-sm font-medium text-gray-700"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-2 whitespace-nowrap text-sm text-gray-800"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
