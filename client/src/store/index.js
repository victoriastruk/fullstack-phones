import { configureStore } from "@reduxjs/toolkit";
import phonesReducer from "./slices/phonesSlice";
export const store = configureStore({
  reducer: {
    phonesData: phonesReducer,
  },
});
