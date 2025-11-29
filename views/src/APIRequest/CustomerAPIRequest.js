import store from "../redux/store/store";
import { HideLoader, ShowLoader } from "../redux/state-slice/settings-slice";
import axios from "axios";
import { errorToast } from "../helper/FormHelper";
import { getToken } from "../helper/SessionHelper";
import {
  SetCustomerListTotal,
  SetCustomerList,
} from "../redux/state-slice/customer-slice";
import { BaseURL } from "../helper/config";

const AxiosHeaders = { headers: { token: getToken() } };

//---------------------- Customer List API Request ------------------//
export async function CustomerListAPIRequest(pageNo, perPage, searchKey) {
  try {
    store.dispatch(ShowLoader());
    const URL =
      BaseURL + "CustomerList/" + pageNo + "/" + perPage + "/" + searchKey;
    const result = await axios.get(URL, AxiosHeaders);
    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      if (result.data["data"][0]["Rows"].length > 0) {
        store.dispatch(SetCustomerList(result.data["data"][0]["Rows"]));
        store.dispatch(
          SetCustomerListTotal(result.data["data"][0]["Total"][0]["count"])
        );
      } else {
        store.dispatch(SetCustomerList([]));
        store.dispatch(SetCustomerListTotal(0));
        errorToast("No Customer Found!");
      }
    } else {
      errorToast("Something Went Wrong!");
    }
  } catch (e) {
    errorToast("Something Went Wrong!");
    store.dispatch(HideLoader());
  }
}
