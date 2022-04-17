import { useCallback } from "react";

import { formatUnits, parseUnits } from "ethers/lib/utils";

import { ONE_HOUR } from "config";
import { floatingMint } from "utils/callHelpers";
import { useActiveWeb3React } from "web3";

import { useLp } from "./useContract";

const useFloatingMint = (lpAddress: string) => {
  const lpContract = useLp(lpAddress);
  const { account } = useActiveWeb3React();

  const handleFloatingMint = useCallback(
    async (amountIn: string, decimals: number) => {
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const status = await floatingMint(lpContract, {
        minNumTokens: 0,
        collateralAmount: formatUnits(parseUnits(amountIn, "ether"), "wei"),
        expiration: currentTimestamp + ONE_HOUR,
        recipient: account,
      });
      return status;
    },
    [lpContract, account]
  );

  return { onFloatingMint: handleFloatingMint };
};

export default useFloatingMint;
