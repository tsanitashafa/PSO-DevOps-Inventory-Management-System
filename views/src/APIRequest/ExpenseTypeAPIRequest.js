import store from "../redux/store/store";
import { HideLoader, ShowLoader } from "../redux/state-slice/settings-slice";
import axios from "axios";
import { errorToast } from "../helper/FormHelper";
import { getToken } from "../helper/SessionHelper";
import {
  SetExpenseTypeListTotal,
  SetExpenseTypeList,
} from "../redux/state-slice/expensetype-slice";
import { BaseURL } from "../helper/config";

const AxiosHeaders = { headers: { token: getToken() } };

//---------------------- ExpenseType List API Request ------------------//
export async function ExpenseTypeListAPIRequest(pageNo, perPage, searchKey) {
  try {
    store.dispatch(ShowLoader());
    const URL =
      BaseURL + "ExpenseTypeList/" + pageNo + "/" + perPage + "/" + searchKey;
    const result = await axios.get(URL, AxiosHeaders);
    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      if (result.data["data"][0]["Rows"].length > 0) {
        store.dispatch(SetExpenseTypeList(result.data["data"][0]["Rows"]));
        store.dispatch(
          SetExpenseTypeListTotal(result.data["data"][0]["Total"][0]["count"])
        );
      } else {
        store.dispatch(SetExpenseTypeList([]));
        store.dispatch(SetExpenseTypeListTotal(0));
        errorToast("No Expense Type  Found!");
      }
    } else {
      errorToast("Something Went Wrong!");
    }
  } catch (e) {
    errorToast("Something Went Wrong!");
    store.dispatch(HideLoader());
  }
}
