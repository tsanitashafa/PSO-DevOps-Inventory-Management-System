import store from "../redux/store/store";
import { HideLoader, ShowLoader } from "../redux/state-slice/settings-slice";
import axios from "axios";
import { ErrorToast, SuccessToast } from "../helper/FormHelper";

import { BaseURL } from "../helper/config";
import { getToken } from "../helper/SessionHelper";

import {
  SetExpenseChart,
  SetExpenseTotal,
  SetPurchaseChart,
  SetPurchaseTotal,
  SetReturnChart,
  SetSaleChart,
  SetSaleTotal,
  SetDashboardSummary,
} from "../redux/state-slice/dashboard-slice";

const AxiosHeaders = { headers: { token: getToken() } };

//---------------------- Expense Summary Request ------------------//
export async function ExpenseSummary() {
  try {
    store.dispatch(ShowLoader());
    const URL = `${BaseURL}ExpenseSummery`;
    const result = await axios.get(URL, AxiosHeaders);

    store.dispatch(HideLoader());
    if (result.status === 200) {
      store.dispatch(SetExpenseChart(result.data["data"][0]["Last30Days"]));
      store.dispatch(
        SetExpenseTotal(result.data["data"][0]["Total"][0]["TotalAmount"])
      );
    } else {
      ErrorToast("Something Went Wrong");
    }
  } catch (e) {
    store.dispatch(HideLoader());
    ErrorToast("Something Went Wrong" + e.message);
  }
}

//---------------------- Return Summary Request ------------------//
export async function ReturnSummary() {
  try {
    store.dispatch(ShowLoader());
    const URL = `${BaseURL}ReturnSummery`;
    const result = await axios.get(URL, AxiosHeaders);

    store.dispatch(HideLoader());
    if (result.status === 200) {
      store.dispatch(SetReturnChart(result.data["data"][0]["Last30Days"]));
      store.dispatch(
        SetReturnTotal(result.data["data"][0]["Total"][0]["TotalAmount"])
      );
    } else {
      ErrorToast("Something Went Wrong");
    }
  } catch (e) {
    store.dispatch(HideLoader());
    ErrorToast("Something Went Wrong");
  }
}

//---------------------- Sale Summary Request ------------------//
export async function SaleSummary() {
  try {
    store.dispatch(ShowLoader());
    const URL = `${BaseURL}SalesSummery`;
    const result = await axios.get(URL, AxiosHeaders);

    store.dispatch(HideLoader());
    if (result.status === 200) {
      store.dispatch(SetSaleChart(result.data["data"][0]["Last30Days"]));
      store.dispatch(
        SetSaleTotal(result.data["data"][0]["Total"][0]["TotalAmount"])
      );
    } else {
      ErrorToast("Something Went Wrong");
    }
  } catch (e) {
    store.dispatch(HideLoader());
    ErrorToast("Something Went Wrong");
  }
}

//---------------------- Purchase Summary Request ------------------//
export async function PurchaseSummary() {
  try {
    store.dispatch(ShowLoader());
    const URL = `${BaseURL}PurchaseSummery`;

    const result = await axios.get(URL, AxiosHeaders);

    store.dispatch(HideLoader());
    if (result.status === 200) {
      store.dispatch(SetPurchaseChart(result.data["data"][0]["Last30Days"]));
      store.dispatch(
        SetPurchaseTotal(result.data["data"][0]["Total"][0]["TotalAmount"])
      );
    } else {
      ErrorToast("Something Went Wrong");
    }
  } catch (e) {
    store.dispatch(HideLoader());
    ErrorToast("Something Went Wrong");
  }
}

//---------------------- Dashboard Summary Request ------------------//
export async function DashboardSummary() {
  try {
    store.dispatch(ShowLoader());

    const URL = `${BaseURL}DashboardSummary`;
    const result = await axios.get(URL, AxiosHeaders);

    console.log("DashboardSummary API result:", result.data);

    store.dispatch(HideLoader());

    if (result.status === 200 && result.data["status"] === "Success") {
      store.dispatch(SetDashboardSummary(result.data["data"]));
    } else {
      ErrorToast("Something Went Wrong");
    }
  } catch (e) {
    store.dispatch(HideLoader());
    console.log("DashboardSummary error:", e);
    ErrorToast("Something Went Wrong");
  }
}
