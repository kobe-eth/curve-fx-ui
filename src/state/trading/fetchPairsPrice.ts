import { ONE, SWAP_FEES } from "config";
import fixedRateLpAbi from "config/abi/fixedRateLp.json";
import lpAbi from "config/abi/lp.json";
import tokens from "config/tokens";
import { Registry } from "state/registry/types";
import { TokenTypes } from "state/types";
import multicall from "utils/multicall";

import { TradingPair } from "./types";

export const fetchPairsPrice = async (
  chainId: number,
  pairsList: TradingPair[],
  registry: {
    floatingRate: Registry;
    fixedRate: Registry;
  }
) => {
  const usdToken = tokens.find((t) => t.symbol === "USDC");

  const pairsWithRate = pairsList.map((pair) => {
    return {
      ...pair,
      feeForOneInBusd: 1,
      rate: 1,
    };
  });

  return pairsWithRate;
};
