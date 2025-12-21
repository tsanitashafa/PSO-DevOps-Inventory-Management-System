import { createSlice } from "@reduxjs/toolkit";

export const settingsSlice = createSlice({
  // Slice name
  name: "settings",
  initialState: {
    loader: "d-none",
  },
  // Reducers
  reducers: {
    ShowLoader: (state) => {
      state.loader = "";
    },
    HideLoader: (state) => {
      state.loader = "d-none";
    },
  },
});

export const { ShowLoader, HideLoader } = settingsSlice.actions;

export default settingsSlice.reducer;
