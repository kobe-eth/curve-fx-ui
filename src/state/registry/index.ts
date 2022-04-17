/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

import tokens from "config/tokens";
import { TokenTypes } from "state/types";

import { fetchRegistry } from "./fetchRegistry";
import { RegistryState, Registry } from "./types";

const initialState: RegistryState = {
  isFetched: false,
  data: {
    floatingRate: {
      address: undefined,
      collaterals: undefined,
      versions: undefined,
      synthTokensSymbol: tokens
        .filter((t) => t.type.includes(TokenTypes.jSynth))
        .map((synthToken) => {
          return {
            ...synthToken,
            lpAddress: undefined,
          };
        }),
    },
    fixedRate: {
      address: undefined,
      collaterals: undefined,
      versions: undefined,
      synthTokensSymbol: tokens
        .filter((t) => t.type.includes(TokenTypes.jSynth))
        .map((synthToken) => {
          return {
            ...synthToken,
            lpAddress: undefined,
          };
        }),
    },
  },
};

export const registrySlice = createSlice({
  name: "Registry",
  initialState,
  reducers: {
    setRegistryData: (state, action) => {
      const registryData: { floatingRate: Registry; fixedRate: Registry } =
        action.payload;
      state.data = registryData;
      state.isFetched = true;
    },
  },
});

// Actions
export const { setRegistryData } = registrySlice.actions;

// Thunks
export const fetchRegistryData = (chainId: number) => async (dispatch) => {
  const registryData = await fetchRegistry(chainId);
  dispatch(setRegistryData(registryData));
};

export default registrySlice.reducer;
