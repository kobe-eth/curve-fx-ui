import { useCallback } from "react";

import { useAllowance } from "./useAllowance";
import useApprove from "./useApprove";

const useApproveIfNeeded = (erc20address: string) => {
  const { onApprove } = useApprove(erc20address);
  const { getAllowance } = useAllowance(erc20address);

  const handleApproveIfNeeded = useCallback(
    async (spenderAddress: string) => {
      const userAllowance = await getAllowance(spenderAddress);
      if (Number(userAllowance) === 0) {
        const status = await onApprove(spenderAddress);
        return status;
      }
    },
    [onApprove, getAllowance]
  );

  return { onApproveIfNeeded: handleApproveIfNeeded };
};

export default useApproveIfNeeded;
