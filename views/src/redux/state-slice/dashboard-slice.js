import { createSlice } from "@reduxjs/toolkit";

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    ExpenseChart: [],
    PurchaseChart: [],
    ReturnChart: [],
    SaleChart: [],
    ExpenseTotal: 0,
    PurchaseTotal: 0,
    ReturnTotal: 0,
    SaleTotal: 0,
  },
  reducers: {
    SetExpenseChart: (state, action) => {
      state.ExpenseChart = action.payload;
    },
    SetSaleChart: (state, action) => {
      state.SaleChart = action.payload;
    },
    SetPurchaseChart: (state, action) => {
      state.PurchaseChart = action.payload;
    },
  },
});

export const { SetExpenseChart, SetPurchaseChart, SetSaleChart } =
  dashboardSlice.actions;
export default dashboardSlice.reducer;
