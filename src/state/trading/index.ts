/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

import { buildPairs } from "./buildPairs";
import { fetchPairsPrice } from "./fetchPairsPrice";
import { fetchPrice } from "./fetchPrice";
import { TradingState, TradingPair, Price } from "./types";

const initialState: TradingState = {
  data: null,
  prices: []
};

export const tradingSlice = createSlice({
  name: "Trading",
  initialState,
  reducers: {
    setTradingData: (state, action) => {
      const tradingData: TradingPair[] = action.payload;
      state.data = tradingData;
    },
    setPriceData: (state, action) => {
      const pricesData: Price[] = action.payload;
      state.prices = pricesData;
    },
  },
});

// Actions
export const { setTradingData, setPriceData } = tradingSlice.actions;

// Thunks
export const fetchTradingData = () => async (dispatch) => {
  const prices = await fetchPrice();
  dispatch(setPriceData(prices));
  const pairs = await buildPairs(prices);
  const pairsWithRate = await fetchPairsPrice(pairs);
  dispatch(setTradingData(pairsWithRate));
};

export default tradingSlice.reducer;
