import tokens from "config/tokens";

export const buildPairs = async (prices: any) => {
  const pairs = [];

  tokens.forEach((tokenIn) => {
    tokens.forEach((tokenOut) => {
      if (tokenIn !== tokenOut) {
        pairs.push({
          name: `${tokenIn.symbol}/${tokenOut.symbol}`,
          token0: Object.assign({}, tokenIn, {
            usdPrice: prices.find((p) => p.symbol === tokenIn.symbol).usdPrice,
          }),
          token1: Object.assign({}, tokenOut, {
            usdPrice: prices.find((p) => p.symbol === tokenOut.symbol).usdPrice,
          }),
        });
      }
    });
  });

  return pairs;
};
