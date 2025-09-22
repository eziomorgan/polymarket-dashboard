"use client";

import { useEffect, useState } from "react";
import type { Market } from "@/types/Market";

const formatPrice = (value: number): string => {
  if (!Number.isFinite(value)) {
    return "0.00";
  }
  return value.toFixed(2);
};

const formatCurrency = (value: number): string => {
  if (!Number.isFinite(value) || value <= 0) {
    return "$0.00";
  }

  return `$${value.toLocaleString(undefined, {
    minimumFractionDigits: value < 1 ? 2 : 0,
    maximumFractionDigits: 2,
  })}`;
};

const formatEndDate = (value: string | null): string => {
  if (!value) {
    return "—";
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return "—";
  }

  const numeric = Number(trimmed);
  let date: Date;

  if (!Number.isNaN(numeric)) {
    const milliseconds = trimmed.length === 10 ? numeric * 1000 : numeric;
    date = new Date(milliseconds);
  } else {
    date = new Date(trimmed);
  }

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleString();
};

export default function MarketsTable() {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMarkets = async () => {
      try {
        const res = await fetch("/api/markets");
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }

        const data = await res.json();
        const marketsResponse: Market[] = Array.isArray(data?.markets)
          ? data.markets
          : [];
        setMarkets(marketsResponse);
      } catch (err) {
        console.error("Error fetching markets:", err);
        setError("Failed to load markets. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadMarkets();
  }, []);

  if (loading) return <p>Loading markets…</p>;

  if (error)
    return <p className="text-red-600" role="alert">{error}</p>;

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
        {markets.length === 0 ? (
          <tr>
            <td
              className="border p-4 text-center text-gray-500"
              colSpan={6}
            >
              No markets available.
            </td>
          </tr>
        ) : (
          markets.map((market) => {
            const yes = formatPrice(market.outcomePrices.yes);
            const no = formatPrice(market.outcomePrices.no);
            const volume = formatCurrency(market.volume);
            const liquidity = formatCurrency(market.liquidity);
            const ends = formatEndDate(market.endDate);

            return (
              <tr key={market.id}>
                <td className="border p-2">{market.question}</td>
                <td className="border p-2">{yes}</td>
                <td className="border p-2">{no}</td>
                <td className="border p-2">{volume}</td>
                <td className="border p-2">{liquidity}</td>
                <td className="border p-2">{ends}</td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
}
