import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import musicService from "./musicService";

const initialState = {
  music: [],
  totalMusics: 0,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const getAllMusics = createAsyncThunk(
  "music/get-musics",
  async (data, thunkAPI) => {
    try {
      return await musicService.getAllMusics(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getMusic = createAsyncThunk(
  "music/get-music",
  async (id, thunkAPI) => {
    try {
      return await musicService.getMusic(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateMusic = createAsyncThunk(
  "music/update-music",
  async (id, thunkAPI) => {
    try {
      return await musicService.updateMusic(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteMusic = createAsyncThunk(
  "music/delete-music",
  async (id, thunkAPI) => {
    try {
      return await musicService.deleteMusic(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAllMusic = createAsyncThunk(
  "music/delete-all",
  async (thunkAPI) => {
    try {
      return await musicService.deleteAllMusic();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addMusic = createAsyncThunk(
  "music/add-music",
  async (data, thunkAPI) => {
    try {
      return await musicService.addMusic(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

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
      .addCase(addMusic.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addMusic.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "success";
      })
      .addCase(addMusic.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getAllMusics.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllMusics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "success";
        state.music = action.payload.music;
        state.totalMusics = action.payload.totalMusics;
        // console.log("Fulfilled - Data:", action.payload);
        // console.log("Fulfilled - music Data:", action.payload.music);
        // console.log("Fulfilled - Total musics:", action.payload.totalMusics);
      })
      .addCase(getAllMusics.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        state.music = action.payload;
      })
      .addCase(updateMusic.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateMusic.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "success";
      })
      .addCase(updateMusic.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(deleteMusic.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteMusic.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "success";
      })
      .addCase(deleteMusic.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(deleteAllMusic.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAllMusic.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "success";
      })
      .addCase(deleteAllMusic.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getMusic.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMusic.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "success";
      })
      .addCase(getMusic.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      });
  },
});

export const { messageClear, user_reset } = musicSlice.actions;

export default musicSlice.reducer;
