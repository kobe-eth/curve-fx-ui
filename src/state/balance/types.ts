import { Token } from "state/types";

export interface Balance extends Token {
  userBalance: number;
}

// Slices state
export interface BalanceState {
  data: Balance[];
}
