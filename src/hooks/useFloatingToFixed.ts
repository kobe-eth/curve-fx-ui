import { useCallback } from "react";

import { defaultAbiCoder, formatUnits, parseUnits } from "ethers/lib/utils";

import { ONE_HOUR } from "config";
import { useNetworkChainId } from "state/network/hooks";
import { getSynthereumFinderAddress } from "utils/addressHelpers";
import { wrapFixedFrom } from "utils/callHelpers";
import { useActiveWeb3React } from "web3";

import { useRouter } from "./useContract";

const useFloatingToFixed = () => {
  const routerContract = useRouter();
  const { account } = useActiveWeb3React();
  const chainId = useNetworkChainId();

  const handleFloatingToFixed = useCallback(
    async (
      tokenIn,
      tokenInLpAddress,
      tokenOutLpAddress,
      pegLpAddress,
      amountIn,
      implementationId = "fixedRateSwap"
    ) => {
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const operationArgs = {
        synthereumFinder: getSynthereumFinderAddress(chainId),
        inputSynthereumPool: tokenInLpAddress,
        exchangeParams: {
          destPool: pegLpAddress,
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

      const status = await wrapFixedFrom(
        routerContract,
        false,
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

  return { onFloatingToFixed: handleFloatingToFixed };
};

export default useFloatingToFixed;
