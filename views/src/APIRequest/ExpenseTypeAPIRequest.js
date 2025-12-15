import store from "../redux/store/store";
import { HideLoader, ShowLoader } from "../redux/state-slice/settings-slice";
import axios from "axios";
import { ErrorToast } from "../helper/FormHelper";

import {
  SetExpenseTypeListTotal,
  SetExpenseTypeList,
} from "../redux/state-slice/expensetype-slice";
import { BaseURL } from "../helper/config";
import { getToken } from "../helper/SessionHelper";

const AxiosHeaders = { headers: { token: getToken() } };

//---------------------- ExpenseType List API Request ------------------//
export async function ExpenseTypeListRequest(pageNo, perPage, searchKey) {
  try {
    store.dispatch(ShowLoader());
    const URL = `${BaseURL}ExpenseTypeList/${pageNo}/${perPage}/${searchKey}`;
    const result = await axios.get(URL, AxiosHeaders);

    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      if (result.data["data"]["Rows"].length > 0) {
        store.dispatch(SetExpenseTypeList(result.data["data"]["Rows"]));
        store.dispatch(
          SetExpenseTypeListTotal(result.data["data"]["Total"][0]["count"])
        );
      } else {
        store.dispatch(SetExpenseTypeList([]));
        store.dispatch(SetExpenseTypeListTotal(0));
        ErrorToast("No ExpenseType Found!");
      }
    } else {
      ErrorToast("Failed to fetch data!");
    }
  } catch (e) {
    ErrorToast("Something Went Wrong!");
    store.dispatch(HideLoader());
    return false;
  }
}
