import store from "../redux/store/store";
import { HideLoader, ShowLoader } from "../redux/state-slice/settings-slice";
import axios from "axios";
import { ErrorToast } from "../helper/FormHelper";

import {
  SetPurchaseListTotal,
  SetPurchaseList,
} from "../redux/state-slice/purchase-slice";
import { BaseURL } from "../helper/config";
import { getToken } from "../helper/SessionHelper";

const AxiosHeaders = { headers: { token: getToken() } };

//---------------------- Purchase List API Request ------------------//
export async function PurchaseListRequest(pageNo, perPage, searchKey) {
  try {
    store.dispatch(ShowLoader());
    const URL = `${BaseURL}PurchaseList/${pageNo}/${perPage}/${searchKey}`;
    const result = await axios.get(URL, AxiosHeaders);

    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      if (result.data["data"]["Rows"].length > 0) {
        store.dispatch(SetPurchaseList(result.data["data"]["Rows"]));
        store.dispatch(
          SetPurchaseListTotal(result.data["data"]["Total"][0]["count"])
        );
      } else {
        store.dispatch(SetPurchaseList([]));
        store.dispatch(SetPurchaseListTotal(0));
        ErrorToast("No Purchase Found!");
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
