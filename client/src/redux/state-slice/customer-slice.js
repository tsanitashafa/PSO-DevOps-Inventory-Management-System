import { createSlice } from "@reduxjs/toolkit";

export const customerSlice = createSlice({
  name: "customer",
  initialState: {
    List: [],
    ListTotal: 0,
    FormValue: {
      CustomerName: "",
      Phone: "",
      Email: "",
      Address: "",
    },
  },
  reducers: {
    SetCustomerList: (state, action) => {
      state.List = action.payload;
    },
    SetCustomerListTotal: (state, action) => {
      state.ListTotal = action.payload;
    },
    OnChangeCustomerInput: (state, action) => {
      // action.payload = {name:'CustomerName', value:'John Doe'}
      state.FormValue[action.payload.name] = action.payload.value;
    },
    ResetFromValue: (state) => {
      // loop through each key in FormValue and set to empty string
      Object.keys(state.FormValue).forEach((key) => {
        state.FormValue[key] = "";
      });
    },
  },
});

export const {
  SetCustomerList,
  SetCustomerListTotal,
  OnChangeCustomerInput,
  ResetFromValue,
} = customerSlice.actions;
export default customerSlice.reducer;
