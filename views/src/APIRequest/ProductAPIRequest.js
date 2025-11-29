import store from "../redux/store/store";
import { HideLoader, ShowLoader } from "../redux/state-slice/settings-slice";
import axios from "axios";
import { errorToast } from "../helper/FormHelper";
import { getToken } from "../helper/SessionHelper";
import {
  SetProductListTotal,
  SetProductList,
} from "../redux/state-slice/product-slice";
import { BaseURL } from "../helper/config";

const AxiosHeaders = { headers: { token: getToken() } };

//---------------------- Product List API Request ------------------//
export async function ProductListAPIRequest(pageNo, perPage, searchKey) {
  try {
    store.dispatch(ShowLoader());
    const URL =
      BaseURL + "ProductList/" + pageNo + "/" + perPage + "/" + searchKey;
    const result = await axios.get(URL, AxiosHeaders);
    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      if (result.data["data"][0]["Rows"].length > 0) {
        store.dispatch(SetProductList(result.data["data"][0]["Rows"]));
        store.dispatch(
          SetProductListTotal(result.data["data"][0]["Total"][0]["count"])
        );
      } else {
        store.dispatch(SetProductList([]));
        store.dispatch(SetProductListTotal(0));
        errorToast("No Product Found!");
      }
    } else {
      errorToast("Something Went Wrong!");
    }
  } catch (e) {
    errorToast("Something Went Wrong!");
    store.dispatch(HideLoader());
  }
}
