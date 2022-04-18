import { Token } from "state/types";

export interface TradingPair {
  name: string;
  token0: Token;
  token1: Token;
  rate: number;
}

export interface Price {
  symbol: string;
  address: string;
  usdPrice: number;
}

// Slices state
export interface TradingState {
  data: TradingPair[];
  prices: Price[];
}
