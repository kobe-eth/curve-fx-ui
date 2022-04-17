/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Network, NetworkState } from "state/types";
import { CHAIN_ID } from "web3/config";

import fetchAndUpdateNetwork from "./fetchNetwork";

const chainIdSafeCheck = (): number => {
  if (typeof window !== "undefined") {
    const localStorageChain = parseInt(
      window.localStorage.getItem("chainIdStatus")
    );
    return localStorageChain || CHAIN_ID.POLYGON;
  }
  return CHAIN_ID.POLYGON;
};

const initChainId = chainIdSafeCheck();

const initialState: NetworkState = {
  isInitialized: false,
  isLoading: true,
  data: { chainId: initChainId },
};

export const networkSlice = createSlice({
  name: "network",
  initialState,
  reducers: {
    networkFetchStart: (state) => {
      state.isLoading = true;
    },
    networkFetchSucceeded: (state, action: PayloadAction<Network>) => {
      state.isInitialized = true;
      state.isLoading = false;
      state.data = action.payload;
    },
    networkFetchFailed: (state) => {
      state.isLoading = false;
      state.isInitialized = true;
    },
    setNetwork: (state, action) => {
      state.isInitialized = true;
      state.isLoading = false;
      state.data.chainId = action.payload.chainId;
    },
  },
});

// Actions
export const {
  networkFetchStart,
  networkFetchSucceeded,
  networkFetchFailed,
  setNetwork,
} = networkSlice.actions;

// thunks
export const fetchUserNetwork =
  (web3ChainId: number, account: string, chainId: number) => (dispatch) => {
    try {
      if (typeof window !== "undefined") {
        dispatch(networkFetchStart());
        const network = fetchAndUpdateNetwork(web3ChainId, account, chainId);
        dispatch(setNetwork(network));
        localStorage.setItem(`chainIdStatus`, JSON.stringify(network.chainId));
      }
    } catch (error) {
      dispatch(networkFetchFailed());
    }
  };

export default networkSlice.reducer;
