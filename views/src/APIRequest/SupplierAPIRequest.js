import store from "../redux/store/store";
import { HideLoader, ShowLoader } from "../redux/state-slice/settings-slice";
import axios from "axios";
import { errorToast } from "../helper/FormHelper";
import { getToken } from "../helper/SessionHelper";
import {
  SetSupplierListTotal,
  SetSupplierList,
} from "../redux/state-slice/supplier-slice";
import { BaseURL } from "../helper/config";

const AxiosHeaders = { headers: { token: getToken() } };

//---------------------- Supplier List API Request ------------------//
export async function SupplierListAPIRequest(pageNo, perPage, searchKey) {
  try {
    store.dispatch(ShowLoader());
    const URL =
      BaseURL + "SupplierList/" + pageNo + "/" + perPage + "/" + searchKey;
    const result = await axios.get(URL, AxiosHeaders);
    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      if (result.data["data"][0]["Rows"].length > 0) {
        store.dispatch(SetSupplierList(result.data["data"][0]["Rows"]));
        store.dispatch(
          SetSupplierListTotal(result.data["data"][0]["Total"][0]["count"])
        );
      } else {
        store.dispatch(SetSupplierList([]));
        store.dispatch(SetSupplierListTotal(0));
        errorToast("No Supplier Found!");
      }
    } else {
      errorToast("Something Went Wrong!");
    }
  } catch (e) {
    errorToast("Something Went Wrong!");
    store.dispatch(HideLoader());
  }
}
