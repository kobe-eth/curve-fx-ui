// const CURVE_API_URL = "https://curve-api-git-main-curvefi.vercel.app/api/getPools/polygon/factory"
const CURVE_API_URL =
  "https://curve-api-git-main-curvefi.vercel.app/api/getFactoryV2Pools-polygon";
const CURVE_IDS = [
  "factory-v2-22",
  "factory-v2-23",
  "factory-v2-37",
  "factory-v2-85",
];

export const fetchPrice = async () => {
  const tokensPriceInUsd = [];
  const response = await fetch(CURVE_API_URL);
  const responseData = await response.json();
  if (response.status === 200 || response.status === 201) {
    const poolData = responseData.data.poolData;
    const filteredPoolData = poolData.filter((p) => CURVE_IDS.includes(p.id));
    filteredPoolData.forEach((pool) => {
      pool.coins.forEach((token) =>
        tokensPriceInUsd.push({
          symbol: token.symbol,
          address: token.address,
          usdPrice: token.usdPrice,
        })
      );
    });
  }
  return tokensPriceInUsd;
};
