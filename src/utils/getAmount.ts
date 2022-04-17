import { TradingPair } from "state/trading/types";
import { format } from "utils/number";

export const getAmountIn = (amountOut: number, tradingPair: TradingPair) => {
  if (tradingPair && amountOut) {
    return format(amountOut / tradingPair.rate, 0, 5);
  }
  return "";
};

export const getAmountOut = (amountIn: number, tradingPair: TradingPair) => {
  if (tradingPair && amountIn) {
    return format(amountIn * tradingPair.rate, 0, 5);
  }
  return "";
};
