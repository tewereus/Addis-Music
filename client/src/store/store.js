import { configureStore } from "@reduxjs/toolkit";
import musicReducer from "../features/musicSlice";

export const store = configureStore({
  reducer: {
    music: musicReducer,
  },
});
