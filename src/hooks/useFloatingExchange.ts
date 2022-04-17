import { useCallback } from "react";

import { formatUnits, parseUnits } from "ethers/lib/utils";

import { ONE_HOUR } from "config";
import { floatingExchange } from "utils/callHelpers";
import { useActiveWeb3React } from "web3";

import { useLp } from "./useContract";

const useFloatingExchange = (lpAddress: string) => {
  const lpContract = useLp(lpAddress);
  const { account } = useActiveWeb3React();

  const handleFloatingExchange = useCallback(
    async (destLpAddress: string, amountIn: string) => {
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const status = await floatingExchange(lpContract, {
        destPool: destLpAddress,
        numTokens: formatUnits(parseUnits(amountIn, "ether"), "wei"),
        minDestNumTokens: 0,
        expiration: currentTimestamp + ONE_HOUR,
        recipient: account,
      });
      return status;
    },
    [lpContract, account]
  );

  return { onFloatingExchange: handleFloatingExchange };
};

export default useFloatingExchange;
