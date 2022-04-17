import { useEffect, useState } from "react";

import contracts from "config/contracts";
import { useActiveWeb3React } from "web3";

const useAddress = (addresses) => {
  const { chainId } = useActiveWeb3React();
  const [address, setAddress] = useState(addresses[chainId]);
  useEffect(() => {
    setAddress(addresses[chainId]);
  }, [chainId, addresses]);
  return address;
};

export const useRouterAddress = () => {
  return useAddress(contracts.liquidityRouter);
};

export const useCurveRouter = () => {
  return useAddress(contracts.curveRouter);
};

export const useFloatingRateRegistryAddress = () => {
  return useAddress(contracts.floatingRateRegistry);
};

export const useFixedRateRegistryAddress = () => {
  return useAddress(contracts.fixedRateRegistry);
};