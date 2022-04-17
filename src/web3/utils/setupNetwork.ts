import { CHAIN_PARAMS } from "../config/chains";

const setupNetwork = async (chainId: number) => {
  const provider = (window as WindowChain).ethereum;
  if (provider) {
    try {
      await provider.request({
        method: "wallet_addEthereumChain",
        params: [CHAIN_PARAMS[chainId]],
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  } else {
    console.error(
      "Can't setup the network on metamask because window.ethereum is undefined"
    );
    return false;
  }
};

export default setupNetwork;
