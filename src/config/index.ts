import BigNumber from "bignumber.js";

export const DECIMALS = new BigNumber(10).pow(18);
export const ONE = new BigNumber(1).times(DECIMALS).toString();

export const ONE_HOUR = 3600;

export const JARVIS_SWAP_FEES = 0.0010;
export const CURVE_SWAP_FEES = 0.0004;
