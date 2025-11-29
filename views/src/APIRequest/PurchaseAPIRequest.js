import store from "../redux/store/store";
import { HideLoader, ShowLoader } from "../redux/state-slice/settings-slice";
import axios from "axios";
import { errorToast } from "../helper/FormHelper";
import { getToken } from "../helper/SessionHelper";
import {
  SetPurchaseListTotal,
  SetPurchaseList,
} from "../redux/state-slice/purchase-slice";
import { BaseURL } from "../helper/config";

const AxiosHeaders = { headers: { token: getToken() } };

//---------------------- Purchase List API Request ------------------//
export async function PurchaseListAPIRequest(pageNo, perPage, searchKey) {
  try {
    store.dispatch(ShowLoader());
    const URL =
      BaseURL + "PurchaseList/" + pageNo + "/" + perPage + "/" + searchKey;
    const result = await axios.get(URL, AxiosHeaders);
    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      if (result.data["data"][0]["Rows"].length > 0) {
        store.dispatch(SetPurchaseList(result.data["data"][0]["Rows"]));
        store.dispatch(
          SetPurchaseListTotal(result.data["data"][0]["Total"][0]["count"])
        );
      } else {
        store.dispatch(SetPurchaseList([]));
        store.dispatch(SetPurchaseListTotal(0));
        errorToast("No Purchase Found!");
      }
    } else {
      errorToast("Something Went Wrong!");
    }
  } catch (e) {
    errorToast("Something Went Wrong!");
    store.dispatch(HideLoader());
  }
}
