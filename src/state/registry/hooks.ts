import { useEffect } from "react";

import { useSelector } from "react-redux";

import { useAppDispatch } from "state";
import { useNetworkChainId } from "state/network/hooks";
import { State, Token, TokenTypes } from "state/types";
import { CHAIN_ID } from "web3/config";

import { fetchRegistryData } from ".";
import { Registry, RegistryState } from "./types";

export const useFetchRegistry = () => {
  const dispatch = useAppDispatch();
  const chainId = useNetworkChainId();

  useEffect(() => {
    if (chainId === CHAIN_ID.POLYGON) {
      dispatch(fetchRegistryData(chainId));
    }
  }, [dispatch, chainId]);
};

export const useFullRegistry = (): RegistryState => {
  const registry = useSelector((state: State) => state.registry);
  return registry;
};

export const useRegistry = (): {
  floatingRate: Registry;
  fixedRate: Registry;
} => {
  const registry = useSelector((state: State) => state.registry.data);
  return registry;
};

export const useFloatingRateRegistry = (): Registry => {
  const floatingRateRegistry = useSelector(
    (state: State) => state.registry.data.floatingRate
  );
  return floatingRateRegistry;
};

export const useFixedRateRegistry = (): Registry => {
  const fixedRateRegistry = useSelector(
    (state: State) => state.registry.data.fixedRate
  );
  return fixedRateRegistry;
};

export const useLpFromRegistry = (tokenSymbol: Token) => {
  const registry = useRegistry();
  if (
    tokenSymbol.type.includes(TokenTypes.collateral) ||
    tokenSymbol.type.includes(TokenTypes.stablecoin)
  ) {
    return null;
  }
  const lpFromFloating = registry.floatingRate.synthTokensSymbol.find(
    (t) => t.symbol === tokenSymbol.symbol
  );
  if (lpFromFloating) {
    return lpFromFloating.lpAddress;
  }
  const lpFromFixed = registry.fixedRate.synthTokensSymbol.find(
    (t) => t.symbol === tokenSymbol.symbol
  );
  return lpFromFixed.lpAddress;
};
