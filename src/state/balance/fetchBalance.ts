import { formatUnits } from "ethers/lib/utils";

import erc20Abi from "config/abi/erc20.json";
import tokens from "config/tokens";
import multicall from "utils/multicall";

export const fetchBalance = async (chainId: number, account: string) => {
  const callsBalance = tokens.map((t) => {
    return {
      address: t.address,
      name: "balanceOf",
      params: [account],
    };
  });

  const rawBalances = await multicall(chainId, erc20Abi, callsBalance);

  const balances = rawBalances.map((t, index) => {
    const balance = t["balance"];
    return {
      ...tokens[index],
      userBalance: formatUnits(balance, 0),
    };
  });

  return balances;
};
