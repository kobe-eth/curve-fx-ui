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

export const floatingMint = async (lpContract, mintParams) => {
  try {
    const gasEstimation = estimateGas(lpContract, "mint", [mintParams]);
    const tx = await lpContract.mint(mintParams, {
      gasLimit: gasEstimation,
    });
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

export const floatingRedeem = async (lpContract, redeemParams) => {
  try {
    const gasEstimation = estimateGas(lpContract, "redeem", [redeemParams]);
    const tx = await lpContract.redeem(redeemParams, {
      gasLimit: gasEstimation,
    });
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

export const floatingExchange = async (lpContract, exchangeParams) => {
  try {
    const gasEstimation = estimateGas(lpContract, "exchange", [exchangeParams]);
    const tx = await lpContract.exchange(exchangeParams, {
      gasLimit: gasEstimation,
    });
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

export const fixedWrap = async (lpContract, collateralAmount, recipient) => {
  try {
    const gasEstimation = estimateGas(lpContract, "wrap", [
      collateralAmount,
      recipient,
    ]);
    const tx = await lpContract.wrap(collateralAmount, recipient, {
      gasLimit: gasEstimation,
    });
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

export const fixedUnwrap = async (lpContract, tokenAmount, recipient) => {
  try {
    const gasEstimation = estimateGas(lpContract, "unwrap", [
      tokenAmount,
      recipient,
    ]);
    const tx = await lpContract.unwrap(tokenAmount, recipient, {
      gasLimit: gasEstimation,
    });
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

export const wrapFixedFrom = async (
  routerContract,
  fromERC20,
  implementationId,
  inputAsset,
  outputLp,
  operationArgs,
  recipient
) => {
  try {
    const gasEstimation = estimateGas(routerContract, "wrapFixedRateFrom", [
      fromERC20,
      implementationId,
      inputAsset,
      outputLp,
      operationArgs,
      recipient,
    ]);
    const tx = await routerContract.wrapFixedRateFrom(
      fromERC20,
      implementationId,
      inputAsset,
      outputLp,
      operationArgs,
      recipient,
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

export const unwrapFixedTo = async (
  routerContract,
  toERC20,
  implementationId,
  inputAsset,
  outputAsset,
  inputAmount,
  operationArgs
) => {
  try {
    const gasEstimation = estimateGas(routerContract, "unwrapFixedRateTo", [
      toERC20,
      implementationId,
      inputAsset,
      outputAsset,
      inputAmount,
      operationArgs,
    ]);
    const tx = await routerContract.unwrapFixedRateTo(
      toERC20,
      implementationId,
      inputAsset,
      outputAsset,
      inputAmount,
      operationArgs,
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
