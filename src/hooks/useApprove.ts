import { useCallback } from "react";

import { approve } from "utils/callHelpers";

import { useERC20 } from "./useContract";

const useApprove = (erc20address: string) => {
  const erc20Contract = useERC20(erc20address);

  const handleApprove = useCallback(
    async (spenderAddress: string) => {
      const status = await approve(erc20Contract, spenderAddress);
      return status;
    },
    [erc20Contract]
  );

  return { onApprove: handleApprove };
};

export default useApprove;
