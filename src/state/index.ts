import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import balanceReducer from "./balance";
import networkReducer from "./network";
import tradingReducer from "./trading";

const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer: {
    network: networkReducer,
    balance: balanceReducer,
    trading: tradingReducer,
  },
});

/**
 * @see https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
 */
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
