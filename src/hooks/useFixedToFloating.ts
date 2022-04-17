import { useCallback } from "react";

import { defaultAbiCoder, formatUnits, parseUnits } from "ethers/lib/utils";

import { ONE_HOUR } from "config";
import { useNetworkChainId } from "state/network/hooks";
import { getSynthereumFinderAddress } from "utils/addressHelpers";
import { unwrapFixedTo } from "utils/callHelpers";
import { useActiveWeb3React } from "web3";

import { useRouter } from "./useContract";

const useFixedToFloating = () => {
  const routerContract = useRouter();
  const { account } = useActiveWeb3React();
  const chainId = useNetworkChainId();

  const handleFixedToFloating = useCallback(
    async (
      tokenOut,
      tokenInLpAddress,
      tokenOutLpAddress,
      pegLpAddress,
      amountIn,
      implementationId = "fixedRateSwap"
    ) => {
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const operationArgs = {
        synthereumFinder: getSynthereumFinderAddress(chainId),
        inputSynthereumPool: pegLpAddress,
        exchangeParams: {
          destPool: tokenOutLpAddress,
          numTokens: formatUnits(parseUnits(amountIn, "ether"), "wei"),
          minDestNumTokens: 0,
          expiration: currentTimestamp + ONE_HOUR,
          recipient: account,
        },
      };

      const bytesOperationArgs = defaultAbiCoder.encode(
        [
          "tuple(address synthereumFinder, address inputSynthereumPool, tuple(address destPool, uint256 numTokens, uint256 minDestNumTokens, uint256 expiration, address recipient) exchangeParams)",
        ],
        [operationArgs]
      );

      const status = await unwrapFixedTo(
        routerContract,
        false,
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

  return { onFixedToFloating: handleFixedToFloating };
};

export default useFixedToFloating;
