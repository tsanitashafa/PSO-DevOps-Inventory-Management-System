import store from "../redux/store/store";
import { HideLoader, ShowLoader } from "../redux/state-slice/settings-slice";
import axios from "axios";
import { ErrorToast } from "../helper/FormHelper";

import {
  SetSupplierListTotal,
  SetSupplierList,
} from "../redux/state-slice/supplier-slice";
import { BaseURL } from "../helper/config";
import { getToken } from "../helper/SessionHelper";

const AxiosHeaders = { headers: { token: getToken() } };

//----------------------Supplier List API Request ------------------//
export async function SupplierListRequest(pageNo, perPage, searchKey) {
  try {
    store.dispatch(ShowLoader());
    const URL = `${BaseURL}SupplierList/${pageNo}/${perPage}/${searchKey}`;
    const result = await axios.get(URL, AxiosHeaders);

    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      if (result.data["data"]["Rows"].length > 0) {
        store.dispatch(SetSupplierList(result.data["data"]["Rows"]));
        store.dispatch(
          SetSupplierListTotal(result.data["data"]["Total"][0]["count"])
        );
      } else {
        store.dispatch(SetSupplierList([]));
        store.dispatch(SetSupplierListTotal(0));
        ErrorToast("NoSupplier Found!");
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
