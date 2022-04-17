import { useCallback } from "react";

import { useActiveWeb3React } from "web3";
import { useExchange } from "./useContract";
import { ExchangeParams, Token, TokenTypes } from "state/types";
import tokens from "config/tokens";
import { exchange } from "utils/callHelpers";
import { formatUnits, parseUnits } from "ethers/lib/utils";

const buildArgs = (tokenIn: Token, tokenOut: Token): ExchangeParams => {
  const token = tokenIn.type.includes(TokenTypes.jSynth) ? tokenIn : tokens.find((t) => t.symbol == tokenIn.jSynthAssociated);
  const destToken = tokenOut.type.includes(TokenTypes.jSynth) ? tokenOut : tokens.find((t) => t.symbol == tokenOut.jSynthAssociated);

  console.log(token)
  console.log(destToken)

  return {
    derivative: token.derivative,
    destPool: destToken.pool,
    destDerivative: destToken.derivative,
  };
};

const useFXEchange = () => {
  const curveRouter = useExchange();
  const { account } = useActiveWeb3React();

  const handleCurveRouterExchange = useCallback(
    async (tokenIn: Token, tokenOut: Token, amountIn: string) => {
      const status = await exchange(
        curveRouter,
        tokenIn.address,
        tokenOut.address,
        formatUnits(parseUnits(amountIn, tokenIn.decimals), "wei"),
        buildArgs(tokenIn, tokenOut)
      );
      return status
    },
    [account]
  );

  return { onExchange: handleCurveRouterExchange };
};

export default useFXEchange;
