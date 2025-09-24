"use client";

import React, { useEffect, useState } from "react";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

type Market = {
  id: string;
  question: string;
  endDate: string;
  category: string;
  volumeNum: number;
  liquidityNum: number;
  bestBid: number;
  bestAsk: number;
};

// 🔹 Columns definition
const columns: ColumnDef<Market>[] = [
  {
    accessorKey: "question",
    header: "Market Question",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ getValue }) =>
      new Date(getValue<string>()).toLocaleDateString(),
  },
  {
    accessorKey: "volumeNum",
    header: "Volume",
  },
  {
    accessorKey: "liquidityNum",
    header: "Liquidity",
  },
  {
    accessorKey: "bestBid",
    header: "Best Bid",
  },
  {
    accessorKey: "bestAsk",
    header: "Best Ask",
  },
];

export default function MarketsTable() {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch from API
  useEffect(() => {
    async function loadMarkets() {
      const res = await fetch("/api/markets");
      const data = await res.json();
      console.log("MarketsTable got data:", data);

      // 🔹 Adjust here depending on API shape
      // If API returns { markets: [...] }
      if (Array.isArray(data.markets)) {
        setMarkets(data.markets);
      } else if (Array.isArray(data)) {
        setMarkets(data);
      }

      setLoading(false);
    }

    loadMarkets();
  }, []);

  // 🔹 Setup TanStack table
  const table = useReactTable({
    data: markets,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) return <p>Loading…</p>;

  return (
    <table className="min-w-full border border-gray-300">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className="border px-2 py-1 text-left bg-gray-100"
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
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="border px-2 py-1">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
