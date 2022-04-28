import { BalanceState } from "./balance/types";
import { NetworkState } from "./network/types";
import { TradingState } from "./trading/types";

export enum TokenTypes {
  stablecoin = "stablecoin",
  collateral = "collateral",
  jSynth = "jSynth",
  metapool = "meta",
}

export interface ExchangeParams {
  derivative: string;
  destPool: string;
  destDerivative: string;
}

export interface Token {
  symbol: string;
  address: string;
  decimals?: number;
  type: TokenTypes[];
  collateralSymbol?: string;
  jSynthAssociated?: string;
  usdPrice?: number;
  ///
  derivative?: string;
  pool?: string;
}

// Global state
export interface State {
  network: NetworkState;
  balance: BalanceState;
  trading: TradingState;
}

export type { Network, NetworkState } from "./network/types";
