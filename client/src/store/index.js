import { configureStore } from "@reduxjs/toolkit";
import phonesReducer from "./slices/phonesSlice";
import cpusReducer from "./slices/cpusSlice";

export const store = configureStore({
  reducer: {
    phonesData: phonesReducer,
    cpusData: cpusReducer,
  },
});
