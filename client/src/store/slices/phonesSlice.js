import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as API from "./../../api";

const PHONES_SLICE_NAME = "phones";

const initialState = {
  phones: [],
  isFetching: false,
  error: null,
};

export const createPhoneThunk = createAsyncThunk(
  `${PHONES_SLICE_NAME}/create`,
  async (payload, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await API.createPhone(payload);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const getPhonesThunk = createAsyncThunk(
  `${PHONES_SLICE_NAME}/get`,
  async (payload, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await API.getPhones();
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const updateNfcThunk = createAsyncThunk(
  `${PHONES_SLICE_NAME}/updateNfc`,
  async (payload, { rejectWithValue }) => {
    try {
      await API.updateNfc(payload.id, { has_nfc: payload.has_nfc });
      return payload;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
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
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
export const phonesSlice = createSlice({
  name: PHONES_SLICE_NAME,
  initialState,
  extraReducers: (builder) => {
    //create
    builder.addCase(createPhoneThunk.pending, (state) => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(createPhoneThunk.fulfilled, (state, { payload }) => {
      state.phones.push(payload);
      state.isFetching = false;
    });
    builder.addCase(createPhoneThunk.rejected, (state, { payload }) => {
      state.phones = payload;
      state.isFetching = false;
    });
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

    //update
    builder.addCase(updateNfcThunk.pending, (state) => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(updateNfcThunk.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      const index = state.phones.findIndex((p) => p.id === payload.id);
      if (index !== -1) {
        state.phones[index].has_nfc = payload.has_nfc;
      }
    });
    builder.addCase(updateNfcThunk.rejected, (state, { payload }) => {
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
