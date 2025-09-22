import axios from "axios";
import type { Market } from "@/types/Market";

const GAMMA_URL = "https://gamma-api.polymarket.com";

const client = axios.create({
  baseURL: GAMMA_URL,
  headers: {
    "User-Agent": "PolymarketDashboard/1.0 (+https://github.com/polymarket-dashboard)",
    Accept: "application/json",
  },
  timeout: 10000,
});

const toNumber = (value: unknown): number => {
  const parsed =
    typeof value === "number"
      ? value
      : typeof value === "string"
        ? parseFloat(value)
        : NaN;
  return Number.isFinite(parsed) ? parsed : 0;
};

type RawOutcome = {
  name?: string;
  price?: number | string;
};

type RawMarket = {
  id?: string;
  question?: string;
  outcomes?: RawOutcome[];
  volume24h?: number | string;
  volume24Hr?: number | string;
  volume_24h?: number | string;
  liquidity?: number | string;
  totalLiquidity?: number | string;
  endDate?: string;
  closesAt?: string;
  closeDate?: string;
  closeTime?: string;
};

const pickOutcomePrice = (market: RawMarket, desired: "yes" | "no"): number => {
  if (!Array.isArray(market.outcomes) || market.outcomes.length === 0) {
    return 0;
  }

  const match = market.outcomes.find((outcome) => {
    if (!outcome?.name) {
      return false;
    }
    return outcome.name.toLowerCase() === desired;
  });

  const fallbackIndex = desired === "yes" ? 0 : 1;
  const fallback = market.outcomes[fallbackIndex];

  return toNumber(match?.price ?? fallback?.price);
};

const resolveEndDate = (market: RawMarket): string | null => {
  const candidates = [
    market.endDate,
    market.closesAt,
    market.closeDate,
    market.closeTime,
  ];

  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate.trim().length > 0) {
      return candidate;
    }
  }

  return null;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isMarketsArray = (value: unknown): value is RawMarket[] =>
  Array.isArray(value);

const normaliseMarketsPayload = (payload: unknown): RawMarket[] => {
  if (isMarketsArray(payload)) {
    return payload;
  }

  if (!isRecord(payload)) {
    return [];
  }

  const marketsFromRoot = payload["markets"];
  if (isMarketsArray(marketsFromRoot)) {
    return marketsFromRoot;
  }

  const data = payload["data"];
  if (isMarketsArray(data)) {
    return data;
  }

  if (isRecord(data)) {
    const nestedMarkets = data["markets"];
    if (isMarketsArray(nestedMarkets)) {
      return nestedMarkets;
    }
  }

  return [];
};

export async function fetchMarkets(limit = 50): Promise<Market[]> {
  const response = await client.get("/markets", {
    params: {
      limit,
      active: true,
    },
  });

  const marketsPayload = normaliseMarketsPayload(response.data);

  return marketsPayload
    .map((market) => ({
      id: market.id ?? "",
      question: market.question ?? "",
      outcomePrices: {
        yes: pickOutcomePrice(market, "yes"),
        no: pickOutcomePrice(market, "no"),
      },
      volume:
        toNumber(market.volume24h) ||
        toNumber(market.volume24Hr) ||
        toNumber(market.volume_24h),
      liquidity: toNumber(market.liquidity) || toNumber(market.totalLiquidity),
      endDate: resolveEndDate(market),
    }))
    .filter((market): market is Market => Boolean(market.id && market.question));
}
