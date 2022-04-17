import { useCallback } from "react";

import { useWeb3React } from "@web3-react/core";
import { useDispatch } from "react-redux";

import { fetchUserNetwork } from "state/network";

import setupNetwork from "../utils/setupNetwork";

const useSwitchNetwork = () => {
  const { chainId, account } = useWeb3React();
  const dispatch = useDispatch();
  const switchNetwork = useCallback(
    (userChainId: number) => {
      if (account && userChainId !== chainId) {
        setupNetwork(userChainId);
      } else {
        dispatch(fetchUserNetwork(chainId, account, userChainId));
      }
    },
    [chainId, account, dispatch]
  );
  return { switchNetwork };
};

export default useSwitchNetwork;
