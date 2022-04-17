/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

import { buildPairsAndRoutes } from "./buildPairsAndRoutes";
import { fetchPairsPrice } from "./fetchPairsPrice";
import { TradingState, TradingPair } from "./types";

const initialState: TradingState = {
  data: null,
};

export const tradingSlice = createSlice({
  name: "Trading",
  initialState,
  reducers: {
    setTradingData: (state, action) => {
      const tradingData: TradingPair[] = action.payload;
      state.data = tradingData;
    },
  },
});

// Actions
export const { setTradingData } = tradingSlice.actions;

// Thunks
export const fetchTradingData = (chainId, registry) => async (dispatch) => {
  const pairs = await buildPairsAndRoutes();
  const pairsWithRate = await fetchPairsPrice(chainId, pairs, registry.data);
  dispatch(setTradingData(pairsWithRate));
};

export default tradingSlice.reducer;
