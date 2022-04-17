import { useCallback } from "react";

import { formatUnits, parseUnits } from "ethers/lib/utils";

import { ONE_HOUR } from "config";
import { floatingRedeem } from "utils/callHelpers";
import { useActiveWeb3React } from "web3";

import { useLp } from "./useContract";

const useFloatingRedeem = (lpAddress: string) => {
  const lpContract = useLp(lpAddress);
  const { account } = useActiveWeb3React();

  const handleFloatingRedeem = useCallback(
    async (amountIn: string) => {
      const currentTimestamp = Math.floor(Date.now() / 1000);

      const status = await floatingRedeem(lpContract, {
        numTokens: formatUnits(parseUnits(amountIn, "ether"), "wei"),
        minCollateral: 0,
        expiration: currentTimestamp + ONE_HOUR,
        recipient: account,
      });
      return status;
    },
    [lpContract, account]
  );

  return { onFloatingRedeem: handleFloatingRedeem };
};

export default useFloatingRedeem;
