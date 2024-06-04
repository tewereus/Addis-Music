import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import musicService from "./musicService";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

const getAllMusics = createAsyncThunk("music/get-musics", async (thunk) => {
  try {
    return await musicService.getAllMusics(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    messageClear: (state) => {
      state.isSuccess = false;
      state.isError = false;
    },
    user_reset: (state) => {
      state.user = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllMusics.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllMusics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "success";
      })
      .addCase(getAllMusics.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      });
  },
});

export const { messageClear, user_reset } = musicSlice.actions;

export default musicSlice.reducer;
