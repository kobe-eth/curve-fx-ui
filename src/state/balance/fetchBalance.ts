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

  const callDecimal = tokens.map((t) => {
    return {
      address: t.address,
      name: "decimals",
    };
  });

  const rawBalances = await multicall(chainId, erc20Abi, callsBalance);
  const rawDecimals = await multicall(chainId, erc20Abi, callDecimal);

  const balances = rawBalances.map((t, index) => {
    const balance = t["balance"];
    return {
      ...tokens[index],
      userBalance: Number(balance) > 0 ? balance : 0,
    };
  });

  return balances;
};
