import tokens from "config/tokens";
import { Token, TokenTypes } from "state/types";

const buildRoute = (token0: Token, token1: Token) => {
  // USDC -> jFIAT || jFIAT -> USDC || jEUR -> cXOF || cXOF -> jEUR
  if (
    (token0.type.includes(TokenTypes.collateral) &&
      token1.type.includes(TokenTypes.jSynth)) ||
    (token0.type.includes(TokenTypes.jSynth) &&
      token1.type.includes(TokenTypes.collateral))
  ) {
    return [token0, token1];
  } else if (
    token0.type.includes(TokenTypes.jSynth) &&
    token1.type.includes(TokenTypes.jSynth)
  ) {
    return [token0, tokens.find((t) => t.symbol === "USDC"), token1];
  }
  // jFIAT -> cXOF || cXOF -> jFIAT || USDC -> cXOF || cXOF -> USDC
  else {
    return [token0, tokens.find((t) => t.symbol === "jEUR"), token1];
  }
};

export const buildPairsAndRoutes = async () => {
  const pairs = [];

  tokens.forEach((tokenIn) => {
    tokens.forEach((tokenOut) => {
      if (tokenIn !== tokenOut) {
        pairs.push({
          name: `${tokenIn.symbol}/${tokenOut.symbol}`,
          token0: tokenIn,
          token1: tokenOut,
          route: buildRoute(tokenIn, tokenOut),
        });
      }
    });
  });

  return pairs;
};
