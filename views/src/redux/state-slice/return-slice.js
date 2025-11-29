import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};
export const demoSlice = createSlice({
  name: "demo",
  initialState,
  reducers: {
    setDemo: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setDemo } = demoSlice.actions;
export default demoSlice.reducer;
