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

export const useCurveRouter = () => {
  return useAddress(contracts.curveRouter);
};
