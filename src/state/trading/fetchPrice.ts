import tokens from "config/tokens";

// const CURVE_API_URL = "https://curve-api-git-main-curvefi.vercel.app/api/getPools/polygon/factory"
const CURVE_API_URL =
  "https://curve-api-git-main-curvefi.vercel.app/api/getFactoryV2Pools-polygon";

const CURVE_MAIN_API =
  "https://api.curve.fi/api/getPools/polygon/main";

const CURVE_IDS = [
  "factory-v2-22",
  "factory-v2-23",
  "factory-v2-37",
  "factory-v2-85",
  "factory-v2-107",
  "factory-v2-0",
];

const CURVE_MAIN_IDS = [
  "0",
];

export const fetchPrice = async () => {
  const tokensPriceInUsd = [
    {
      symbol: tokens[0].symbol,
      address: tokens[0].address,
      usdPrice: 1,
    },
  ];
  const response = await fetch(CURVE_API_URL);
  const responseMain = await fetch(CURVE_MAIN_API);

  const responseData = await response.json();
  const responseMainData = await responseMain.json();

  if (response.status === 200 || response.status === 201) {
    const poolData = responseData.data.poolData;
    const filteredPoolData = poolData.filter((p) => CURVE_IDS.includes(p.id));
    filteredPoolData.forEach((pool) => {
      pool.coins.forEach((token) =>{
        console.log(token.symbol)
        tokensPriceInUsd.push({
          symbol: token.symbol === "miMATIC" ? "MAI" : token.symbol,
          address: token.address,
          usdPrice: token.usdPrice ? token.usdPrice : 1,
        })

      }
      );
    });
  }

  if (responseMain.status === 200 || responseMain.status === 201) {
    const poolData = responseMainData.data.poolData;
    const filteredPoolData = poolData.filter((p) => CURVE_MAIN_IDS.includes(p.id));
    filteredPoolData.forEach((pool) => {
      pool.coins.forEach((token) =>{
        tokensPriceInUsd.push({
          symbol: token.symbol.substring(2),
          address: token.address,
          usdPrice: token.usdPrice,
        })

      }
      );
    });
  }

  return tokensPriceInUsd;
};
