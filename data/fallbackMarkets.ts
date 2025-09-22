import type { Market } from "@/types/Market";

export const FALLBACK_MARKETS: Market[] = [
  {
    id: "fallback-trump-2024",
    question: "Will Donald Trump win the 2024 U.S. presidential election?",
    outcomePrices: {
      yes: 0.63,
      no: 0.37,
    },
    volume: 4123456.72,
    liquidity: 508234.15,
    endDate: "2024-11-06T05:00:00Z",
  },
  {
    id: "fallback-btc-100k-2025",
    question: "Will Bitcoin trade above $100,000 at any point during 2025?",
    outcomePrices: {
      yes: 0.41,
      no: 0.59,
    },
    volume: 1893450.11,
    liquidity: 302114.44,
    endDate: "2025-12-31T23:59:00Z",
  },
  {
    id: "fallback-eth-etf-2024",
    question: "Will a U.S. spot Ethereum ETF begin trading by 31 December 2024?",
    outcomePrices: {
      yes: 0.54,
      no: 0.46,
    },
    volume: 973224.77,
    liquidity: 187654.88,
    endDate: "2024-12-31T21:59:00Z",
  },
  {
    id: "fallback-fed-rate-cut",
    question: "Will the Federal Reserve cut rates at its September 2024 meeting?",
    outcomePrices: {
      yes: 0.28,
      no: 0.72,
    },
    volume: 682113.3,
    liquidity: 120998.52,
    endDate: "2024-09-18T18:00:00Z",
  },
  {
    id: "fallback-ai-regulation",
    question: "Will the EU AI Act take effect before 1 January 2025?",
    outcomePrices: {
      yes: 0.47,
      no: 0.53,
    },
    volume: 256899.94,
    liquidity: 85432.18,
    endDate: "2024-12-31T22:59:00Z",
  },
  {
    id: "fallback-nba-champ-2025",
    question: "Will the Boston Celtics win the 2025 NBA Championship?",
    outcomePrices: {
      yes: 0.37,
      no: 0.63,
    },
    volume: 345667.71,
    liquidity: 75654.2,
    endDate: "2025-06-30T04:59:00Z",
  },
  {
    id: "fallback-space-launch",
    question: "Will SpaceX successfully launch Starship into orbit before 1 July 2025?",
    outcomePrices: {
      yes: 0.58,
      no: 0.42,
    },
    volume: 198776.42,
    liquidity: 60543.87,
    endDate: "2025-06-30T23:59:00Z",
  },
  {
    id: "fallback-us-gdp",
    question: "Will U.S. real GDP growth exceed 2.5% in 2024?",
    outcomePrices: {
      yes: 0.33,
      no: 0.67,
    },
    volume: 154332.65,
    liquidity: 50432.55,
    endDate: "2025-01-31T21:59:00Z",
  },
  {
    id: "fallback-olympics",
    question: "Will the USA top the gold medal count at the 2024 Summer Olympics?",
    outcomePrices: {
      yes: 0.69,
      no: 0.31,
    },
    volume: 421998.13,
    liquidity: 109876.4,
    endDate: "2024-08-11T20:00:00Z",
  },
  {
    id: "fallback-weather-miami",
    question: "Will a named hurricane make landfall within 50 miles of Miami in 2024?",
    outcomePrices: {
      yes: 0.22,
      no: 0.78,
    },
    volume: 143221.09,
    liquidity: 45876.91,
    endDate: "2024-11-30T23:59:00Z",
  },
];
