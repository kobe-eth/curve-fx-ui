import { useCallback } from "react";

import { defaultAbiCoder, formatUnits, parseUnits } from "ethers/lib/utils";

import { ONE_HOUR } from "config";
import { useNetworkChainId } from "state/network/hooks";
import { TokenTypes } from "state/types";
import { getSynthereumFinderAddress } from "utils/addressHelpers";
import { wrapFixedFrom } from "utils/callHelpers";
import { useActiveWeb3React } from "web3";

import { useRouter } from "./useContract";

const useWrapFixedFrom = () => {
  const routerContract = useRouter();
  const { account } = useActiveWeb3React();
  const chainId = useNetworkChainId();

  const handleWrapFixedFrom = useCallback(
    async (
      tokenIn,
      tokenOutLpAddress,
      amountIn,
      pegLpAddress,
      implementationId = "fixedRateSwap"
    ) => {
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const operationArgs = {
        swapMintParams: {
          isExactInput: true,
          exactAmount: 0,
          minOutOrMaxIn: 0,
          extraParams: "0x",
          msgSender: account,
        },
        mintParams: {
          synthereumFinder: getSynthereumFinderAddress(chainId),
          synthereumPool: pegLpAddress,
          mintParams: {
            minNumTokens: 0,
            collateralAmount: formatUnits(parseUnits(amountIn, "ether"), "wei"),
            expiration: currentTimestamp + ONE_HOUR,
            recipient: account,
          },
        },
      };

      const bytesOperationArgs = defaultAbiCoder.encode(
        [
          "tuple(tuple(bool isExactInput, uint256 exactAmount, uint256 minOutOrMaxIn, bytes extraParams, address msgSender) swapMintParams, tuple(address synthereumFinder, address synthereumPool, tuple(uint256 minNumTokens, uint256 collateralAmount, uint256 expiration, address recipient) mintParams) mintParams)",
        ],
        [operationArgs]
      );

      const status = await wrapFixedFrom(
        routerContract,
        tokenIn.type.includes(TokenTypes.collateral),
        implementationId,
        tokenIn.address,
        tokenOutLpAddress,
        bytesOperationArgs,
        account
      );
      return status;
    },
    [account, routerContract, chainId]
  );

  return { onWrapFixedFrom: handleWrapFixedFrom };
};

export default useWrapFixedFrom;
