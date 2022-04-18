import { useEffect } from "react";

import { useSelector } from "react-redux";

import { useAppDispatch } from "state";
import { useNetworkChainId } from "state/network/hooks";
import { State } from "state/types";
import { CHAIN_ID } from "web3/config";

import { fetchTradingData } from ".";
import { Price, TradingPair } from "./types";

export const useFetchTradingData = () => {
  const dispatch = useAppDispatch();
  const chainId = useNetworkChainId();

  useEffect(() => {
    if (chainId === CHAIN_ID.POLYGON) {
      dispatch(fetchTradingData());
    }
  }, [dispatch, chainId]);
};

export const useUsdPrices = (): Price[] => {
  const usdPrices = useSelector((state: State) => state.trading.prices);
  return usdPrices;
};

export const useUsdPricesFromSymbol = (symbol: string): Price => {
  const usdPrice = useSelector((state: State) => state.trading.prices.find(p => p.symbol === symbol));
  return usdPrice;
};

export const usePairsAndRoutes = (): TradingPair[] => {
  const tradingPairs = useSelector((state: State) => state.trading.data);
  return tradingPairs;
};

export const usePairsAndRoutesFromSymbol = (
  token0Symbol,
  token1Symbol
): TradingPair => {
  const tradingPair = useSelector((state: State) =>
    state.trading.data
      ? state.trading.data.find(
          (p) => p.name === `${token0Symbol}/${token1Symbol}`
        )
      : null
  );
  return tradingPair;
};
