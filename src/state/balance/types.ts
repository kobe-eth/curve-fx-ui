import { Token } from "state/types";

export interface Balance extends Token {
  userBalance: string;
}

// Slices state
export interface BalanceState {
  data: Balance[];
}
