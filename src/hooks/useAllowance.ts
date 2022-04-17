import { useCallback } from "react";

import { useWeb3React } from "@web3-react/core";

import { useNetworkChainId } from "state/network/hooks";
import { getErc20Contract } from "utils/contractHelpers";

export const useAllowance = (erc20address: string) => {
  const { account } = useWeb3React();
  const chainId = useNetworkChainId();

  const handleFetchAllowance = useCallback(
    async (spenderAddress: string) => {
      if (account) {
        const contract = getErc20Contract(chainId, erc20address);
        const res = await contract.allowance(account, spenderAddress);
        return res.toString();
      }
    },
    [account, chainId, erc20address]
  );

  return { getAllowance: handleFetchAllowance };
};
