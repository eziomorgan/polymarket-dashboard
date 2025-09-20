"use client"; // this makes it a client-side React component

import { useEffect, useState } from "react";

interface Market {
  id: string;
  question: string;
  outcomes: { price: number; name: string }[];
  volume24h: number;
  liquidity: number;
  endDate: string;
}

export default function MarketsTable() {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMarkets() {
      try {
        const res = await fetch("/api/markets");
        const data = await res.json();
        setMarkets(data.markets || []);
      } catch (err) {
        console.error("Error fetching markets:", err);
      } finally {
        setLoading(false);
      }
    }
    loadMarkets();
  }, []);

  if (loading) return <p>Loading markets…</p>;

  return (
    <table className="border-collapse border border-gray-300 w-full text-sm">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-2">Market</th>
          <th className="border p-2">YES Price</th>
          <th className="border p-2">NO Price</th>
          <th className="border p-2">Volume (24h)</th>
          <th className="border p-2">Liquidity</th>
          <th className="border p-2">Ends</th>
        </tr>
      </thead>
      <tbody>
        {markets.map((m) => {
          const yes = parseFloat(m.outcomes?.[0]?.price?.toString() || "0");
          const no = parseFloat(m.outcomes?.[1]?.price?.toString() || "0");
          return (
            <tr key={m.id}>
              <td className="border p-2">{m.question}</td>
              <td className="border p-2">{yes.toFixed(2)}</td>
              <td className="border p-2">{no.toFixed(2)}</td>
              <td className="border p-2">${m.volume24h.toLocaleString()}</td>
              <td className="border p-2">${m.liquidity.toLocaleString()}</td>
              <td className="border p-2">
                {new Date(m.endDate).toLocaleString()}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
