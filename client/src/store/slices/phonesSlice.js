import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as API from "./../../api";

const PHONES_SLICE_NAME = "phones";

const initialState = {
  phones: [],
  isFetching: false,
  error: null,
};

export const getPhonesThunk = createAsyncThunk(
  `${PHONES_SLICE_NAME}/get`,
  async (payload, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await API.getPhones();
      return data;
    } catch (err) {
      return rejectWithValue({ errors: err.response.data });
    }
  }
);

export const deletePhoneThunk = createAsyncThunk(
  `${PHONES_SLICE_NAME}/delete`,
  async (payload, { rejectWithValue }) => {
    try {
      await API.deletePhone(payload);
      return payload;
    } catch (err) {
      return rejectWithValue({ errors: err.response.data });
    }
  }
);
export const phonesSlice = createSlice({
  name: PHONES_SLICE_NAME,
  initialState,
  extraReducers: (builder) => {
    //get
    builder.addCase(getPhonesThunk.pending, (state) => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(getPhonesThunk.fulfilled, (state, { payload }) => {
      state.phones = payload;
      state.isFetching = false;
    });
    builder.addCase(getPhonesThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.isFetching = false;
    });

    //delete
    builder.addCase(deletePhoneThunk.pending, (state) => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(deletePhoneThunk.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.phones = state.phones.filter((u) => u.id !== payload);
    });
    builder.addCase(deletePhoneThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.isFetching = false;
    });
  },
});

const { reducer } = phonesSlice;
export default reducer;
