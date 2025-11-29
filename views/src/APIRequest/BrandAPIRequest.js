import store from "../redux/store/store";
import { HideLoader, ShowLoader } from "../redux/state-slice/settings-slice";
import axios from "axios";
import { errorToast } from "../helper/FormHelper";
import { getToken } from "../helper/SessionHelper";
import {
  SetBrandListTotal,
  SetBrandList,
} from "../redux/state-slice/brand-slice";
import { BaseURL } from "../helper/config";

const AxiosHeaders = { headers: { token: getToken() } };

//---------------------- Brand List API Request ------------------//
export async function BrandListAPIRequest(pageNo, perPage, searchKey) {
  try {
    store.dispatch(ShowLoader());
    const URL =
      BaseURL + "BrandList/" + pageNo + "/" + perPage + "/" + searchKey;
    const result = await axios.get(URL, AxiosHeaders);
    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      if (result.data["data"][0]["Rows"].length > 0) {
        store.dispatch(SetBrandList(result.data["data"][0]["Rows"]));
        store.dispatch(
          SetBrandListTotal(result.data["data"][0]["Total"][0]["count"])
        );
      } else {
        store.dispatch(SetBrandList([]));
        store.dispatch(SetBrandListTotal(0));
        errorToast("No Brand Found!");
      }
    } else {
      errorToast("Something Went Wrong!");
    }
  } catch (e) {
    errorToast("Something Went Wrong!");
    store.dispatch(HideLoader());
  }
}
