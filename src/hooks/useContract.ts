import { useMemo } from "react";

import { Contract } from "@ethersproject/contracts";

import curveRouterABI from "config/abi/curveRouter.json";
import erc20Abi from "config/abi/erc20.json";
import fixedLpAbi from "config/abi/fixedRateLp.json";
import lpAbi from "config/abi/lp.json";
import routerAbi from "config/abi/router.json";
import { getContract } from "utils";
import { useActiveWeb3React } from "web3";

import {
  useCurveRouter,
  useRouterAddress,
} from "./useAddress";

export function useContract(
  abi: any,
  address: string | undefined,
  withSignerIfPossible = true
): Contract | null {
  const { library, account } = useActiveWeb3React();

  return useMemo(() => {
    if (!address || !abi || !library) return null;
    try {
      return getContract(
        address,
        abi,
        library,
        withSignerIfPossible && account ? account : undefined
      );
    } catch (error) {
      console.error("Failed to get contract", error);
      return null;
    }
  }, [address, abi, library, withSignerIfPossible, account]);
}

export const useERC20 = (address: string) => {
  return useContract(erc20Abi, address);
};

export const useLp = (address: string) => {
  return useContract(lpAbi, address);
};

export const useFixedLp = (address: string) => {
  return useContract(fixedLpAbi, address);
};

export const useRouter = () => {
  return useContract(routerAbi, useRouterAddress());
};

export const useExchange = () => {
  return useContract(curveRouterABI, useCurveRouter());
};