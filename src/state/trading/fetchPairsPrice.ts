import { TradingPair } from "./types";

export const fetchPairsPrice = async (pairsList: TradingPair[]) => {
  const pairsWithRate = pairsList.map((pair) => {
    return {
      ...pair,
      rate: pair.token0.usdPrice / pair.token1.usdPrice,
    };
  });

  return pairsWithRate;
};
