import store from "../redux/store/store";
import { HideLoader, ShowLoader } from "../redux/state-slice/settings-slice";
import axios from "axios";
import { errorToast } from "../helper/FormHelper";
import { getToken } from "../helper/SessionHelper";
import { SetSaleListTotal, SetSaleList } from "../redux/state-slice/sale-slice";
import { BaseURL } from "../helper/config";

const AxiosHeaders = { headers: { token: getToken() } };

//---------------------- Sale List API Request ------------------//
export async function SaleListAPIRequest(pageNo, perPage, searchKey) {
  try {
    store.dispatch(ShowLoader());
    const URL =
      BaseURL + "SaleList/" + pageNo + "/" + perPage + "/" + searchKey;
    const result = await axios.get(URL, AxiosHeaders);
    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      if (result.data["data"][0]["Rows"].length > 0) {
        store.dispatch(SetSaleList(result.data["data"][0]["Rows"]));
        store.dispatch(
          SetSaleListTotal(result.data["data"][0]["Total"][0]["count"])
        );
      } else {
        store.dispatch(SetSaleList([]));
        store.dispatch(SetSaleListTotal(0));
        errorToast("No Sale Found!");
      }
    } else {
      errorToast("Something Went Wrong!");
    }
  } catch (e) {
    errorToast("Something Went Wrong!");
    store.dispatch(HideLoader());
  }
}
