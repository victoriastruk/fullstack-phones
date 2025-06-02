import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as API from "./../../api";

const CPUS_SLICE_NAME = "cpus";

const initialState = {
  cpus: [],
  isFetching: false,
  error: null,
};

export const getCpusThunk = createAsyncThunk(
  `${CPUS_SLICE_NAME}/get`,
  async (payload, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await API.getCpus();
      return data;
    } catch (err) {
      return rejectWithValue({ errors: err.response.data });
    }
  }
);

export const cpusSlice = createSlice({
  name: CPUS_SLICE_NAME,
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getCpusThunk.pending, (state) => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(getCpusThunk.fulfilled, (state, { payload }) => {
      state.cpus = payload;
      state.isFetching = false;
    });
    builder.addCase(getCpusThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.isFetching = false;
    });
  },
});

const { reducer } = cpusSlice;
export default reducer;
