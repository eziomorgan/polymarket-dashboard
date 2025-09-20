export interface Market {
    id: string;
    question: string;
    outcomePrices: {
      yes: number;
      no: number;
    };
    volume: number;
    liquidity: number;
    endDate: string;
  }
  