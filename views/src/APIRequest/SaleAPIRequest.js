import store from "../redux/store/store";
import { HideLoader, ShowLoader } from "../redux/state-slice/settings-slice";
import axios from "axios";
import { ErrorToast } from "../helper/FormHelper";

import { SetSaleListTotal, SetSaleList } from "../redux/state-slice/sale-slice";
import { BaseURL } from "../helper/config";
import { getToken } from "../helper/SessionHelper";

const AxiosHeaders = { headers: { token: getToken() } };

//---------------------- Sale List API Request ------------------//
export async function SaleListRequest(pageNo, perPage, searchKey) {
  try {
    store.dispatch(ShowLoader());
    const URL = `${BaseURL}SaleList/${pageNo}/${perPage}/${searchKey}`;
    const result = await axios.get(URL, AxiosHeaders);

    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      if (result.data["data"]["Rows"].length > 0) {
        store.dispatch(SetSaleList(result.data["data"]["Rows"]));
        store.dispatch(
          SetSaleListTotal(result.data["data"]["Total"][0]["count"])
        );
      } else {
        store.dispatch(SetSaleList([]));
        store.dispatch(SetSaleListTotal(0));
        ErrorToast("No Sale Found!");
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
