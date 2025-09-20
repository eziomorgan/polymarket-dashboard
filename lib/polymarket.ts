import axios from "axios";
import { Market } from "../types/Market";

const GAMMA_URL = "https://gamma-api.polymarket.com";

export async function fetchMarkets(): Promise<Market[]> {
  const res = await axios.get(`${GAMMA_URL}/markets`);
  const data = res.data;

  return data.markets.map((m: any) => ({
    id: m.id,
    question: m.question,
    outcomePrices: {
      yes: parseFloat(m.outcomes?.[0]?.price || "0"),
      no: parseFloat(m.outcomes?.[1]?.price || "0"),
    },
    volume: m.volume24h || 0,
    liquidity: m.liquidity || 0,
    endDate: m.endDate,
  }));
}
