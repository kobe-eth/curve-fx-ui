import { ethers, Contract } from "ethers";

export const estimateGas = async (
  contract: Contract,
  methodName: string,
  methodArgs: any[]
) => {
  if (!contract[methodName]) {
    throw new Error(
      `Method ${methodName} doesn't exist on ${contract.address}`
    );
  }
  const rawGasEstimation = await contract.estimateGas[methodName](
    ...methodArgs
  );
  // By convention, ethers.BigNumber values are multiplied by 1000 to avoid dealing with real numbers
  const gasEstimation = rawGasEstimation
    .mul(ethers.BigNumber.from(10000).add(ethers.BigNumber.from(1000)))
    .div(ethers.BigNumber.from(10000));
  return Math.floor(Number(gasEstimation) * 1.2);
};
