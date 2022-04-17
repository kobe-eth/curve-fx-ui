import { useCallback } from "react";

import { formatUnits, parseUnits } from "ethers/lib/utils";

import { fixedUnwrap } from "utils/callHelpers";
import { useActiveWeb3React } from "web3";

import { useFixedLp } from "./useContract";

const useFixedUnwrap = (lpAddress: string) => {
  const lpContract = useFixedLp(lpAddress);
  const { account } = useActiveWeb3React();

  const handleFixedUnwrap = useCallback(
    async (amountIn: string) => {
      const status = await fixedUnwrap(
        lpContract,
        formatUnits(parseUnits(amountIn, "ether"), "wei"),
        account
      );
      return status;
    },
    [lpContract, account]
  );

  return { onFixedUnwrap: handleFixedUnwrap };
};

export default useFixedUnwrap;
