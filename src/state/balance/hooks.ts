import { useEffect } from "react";

import { useWeb3React } from "@web3-react/core";
import { useSelector } from "react-redux";

import useRefresh from "hooks/useRefresh";
import { useAppDispatch } from "state";
import { useNetworkChainId } from "state/network/hooks";
import { State } from "state/types";
import { CHAIN_ID } from "web3/config";

import { fetchBalanceData } from ".";
import { Balance } from "./types";

export const useFetchBalance = () => {
  const { slowRefresh } = useRefresh();
  const dispatch = useAppDispatch();
  const chainId = useNetworkChainId();
  const { account } = useWeb3React();

  useEffect(() => {
    if (chainId === CHAIN_ID.POLYGON && account) {
      dispatch(fetchBalanceData(chainId, account));
    }
  }, [dispatch, slowRefresh, chainId, account]);
};

export const useBalances = (): Balance[] => {
  const balances = useSelector((state: State) => state.balance.data);
  return balances;
};

export const useBalanceFromSymbol = (symbol: string): Balance => {
  const balance = useSelector((state: State) =>
    state.balance.data.find((t) => t.symbol === symbol)
  );
  return balance;
};
