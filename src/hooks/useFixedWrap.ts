import { useCallback } from "react";

import { formatUnits, parseUnits } from "ethers/lib/utils";

import { fixedWrap } from "utils/callHelpers";
import { useActiveWeb3React } from "web3";

import { useFixedLp } from "./useContract";

const useFixedWrap = (lpAddress: string) => {
  const lpContract = useFixedLp(lpAddress);
  const { account } = useActiveWeb3React();

  const handleFixedWrap = useCallback(
    async (amountIn: string) => {
      const status = await fixedWrap(
        lpContract,
        formatUnits(parseUnits(amountIn, "ether"), "wei"),
        account
      );
      return status;
    },
    [lpContract, account]
  );

  return { onFixedWrap: handleFixedWrap };
};

export default useFixedWrap;
