import { useEffect } from "react";

import { useSelector } from "react-redux";

import { useAppDispatch } from "state";
import { State } from "state/types";
import { useActiveWeb3React } from "web3";

import { fetchUserNetwork } from ".";

export const useNetworkChainId = (): number => {
  const chainId = useSelector((state: State) => state.network.data.chainId);
  return chainId;
};

export const useUpdateNetwork = () => {
  const dispatch = useAppDispatch();
  const { chainId, account } = useActiveWeb3React();
  const appChainId = useNetworkChainId();

  useEffect(() => {
    dispatch(fetchUserNetwork(chainId, account, appChainId));
  }, [chainId, account, appChainId, dispatch]);
};
