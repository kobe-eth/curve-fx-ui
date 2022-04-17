/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

import tokens from "config/tokens";

import { fetchBalance } from "./fetchBalance";
import { BalanceState, Balance } from "./types";

const initialState: BalanceState = {
  data: tokens.map((t) => {
    return {
      ...t,
      userBalance: 0,
    };
  }),
};

export const balanceSlice = createSlice({
  name: "Balance",
  initialState,
  reducers: {
    setBalanceData: (state, action) => {
      const balanceData: Balance[] = action.payload;
      state.data = balanceData;
    },
  },
});

// Actions
export const { setBalanceData } = balanceSlice.actions;

// Thunks
export const fetchBalanceData =
  (chainId: number, account: string) => async (dispatch) => {
    const balanceData = await fetchBalance(chainId, account);
    dispatch(setBalanceData(balanceData));
  };

export default balanceSlice.reducer;
