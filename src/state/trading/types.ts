import { Token } from "state/types";

export interface TradingPair {
  name: string;
  token0: Token;
  token1: Token;
  route: Token[];
  rate: number;
}

// Slices state
export interface TradingState {
  data: TradingPair[];
}
