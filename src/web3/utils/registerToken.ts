const registerToken = async (
  tokenAddress: string,
  tokenSymbol: string,
  tokenImage: string,
  tokenDecimals = 18
) => {
  const imgFullUrl =
    typeof window !== "undefined" ? `${window.location}${tokenImage}` : "";
  const tokenAdded = await (window as WindowChain).ethereum.request({
    method: "wallet_watchAsset",
    params: {
      type: "ERC20",
      options: {
        address: tokenAddress,
        symbol: tokenSymbol,
        decimals: tokenDecimals,
        image: imgFullUrl,
      },
    },
  });

  return tokenAdded;
};

export default registerToken;
