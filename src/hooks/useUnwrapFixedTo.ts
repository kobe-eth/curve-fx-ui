import { useCallback } from "react";

import { defaultAbiCoder, formatUnits, parseUnits } from "ethers/lib/utils";

import { ONE_HOUR } from "config";
import { useNetworkChainId } from "state/network/hooks";
import { TokenTypes } from "state/types";
import { getSynthereumFinderAddress } from "utils/addressHelpers";
import { unwrapFixedTo } from "utils/callHelpers";
import { useActiveWeb3React } from "web3";

import { useRouter } from "./useContract";

const useUnwrapFixedTo = () => {
  const routerContract = useRouter();
  const { account } = useActiveWeb3React();
  const chainId = useNetworkChainId();

  const handleUnwrapFixedTo = useCallback(
    async (
      tokenInLpAddress,
      tokenOut,
      amountIn,
      pegLpAddress,
      implementationId = "fixedRateSwap"
    ) => {
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const operationArgs = {
        recipient: account,
        redeemSwapParams: {
          isExactInput: true,
          unwrapToETH: false,
          exactAmount: 0,
          minOutOrMaxIn: 0,
          extraParams: "0x",
          msgSender: account,
        },
        redeemParams: {
          synthereumFinder: getSynthereumFinderAddress(chainId),
          synthereumPool: pegLpAddress,
          redeemParams: {
            numTokens: formatUnits(parseUnits(amountIn, "ether"), "wei"),
            minCollateral: 0,
            expiration: currentTimestamp + ONE_HOUR,
            recipient: account,
          },
        },
      };

      const bytesOperationArgs = defaultAbiCoder.encode(
        [
          "tuple(address recipient, tuple(bool isExactInput, bool unwrapToETH, uint256 exactAmount, uint256 minOutOrMaxIn, bytes extraParams, address msgSender) redeemSwapParams, tuple(address synthereumFinder, address synthereumPool, tuple(uint256 numTokens, uint256 minCollateral, uint256 expiration, address recipient) redeemParams) redeemParams)",
        ],
        [operationArgs]
      );

      const status = await unwrapFixedTo(
        routerContract,
        tokenOut.type.includes(TokenTypes.collateral),
        implementationId,
        tokenInLpAddress,
        tokenOut.address,
        formatUnits(parseUnits(amountIn, "ether"), "wei"),
        bytesOperationArgs
      );
      return status;
    },
    [account, routerContract, chainId]
  );

  return { onUnwrapFixedTo: handleUnwrapFixedTo };
};

export default useUnwrapFixedTo;
