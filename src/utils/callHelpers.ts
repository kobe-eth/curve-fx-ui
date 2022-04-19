import { ethers } from "ethers";

import { estimateGas } from "./estimateGas";
import { createTxToast, errorFromProviderToast } from "./toast";

export const approve = async (erc20Contract, spenderAddress) => {
  try {
    const tx = await erc20Contract.approve(
      spenderAddress,
      ethers.constants.MaxUint256
    );
    createTxToast(tx, "⚡️ Transaction sent!");
    const receipt = await tx.wait();
    createTxToast(tx, "✅ Token approved!");
    return receipt.status;
  } catch (e) {
    console.error(e);
    errorFromProviderToast(e);
    return false;
  }
};

export const exchange = async (
  exchangeRouterContract,
  from,
  to,
  underlyingAmount,
  exchangeParams
) => {
  try {
    const gasEstimation = estimateGas(exchangeRouterContract, "exchange", [
      from,
      to,
      underlyingAmount,
      exchangeParams,
    ]);
    const tx = await exchangeRouterContract.exchange(
      from,
      to,
      underlyingAmount,
      exchangeParams,
      {
        gasLimit: gasEstimation,
      }
    );
    createTxToast(tx, "⚡️ Transaction sent!");
    const receipt = await tx.wait();
    createTxToast(tx, "🔁 Swap confirmed!");
    return receipt.status;
  } catch (e) {
    console.error(e);
    errorFromProviderToast(e);
    return false;
  }
};
