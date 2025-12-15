import store from "../redux/store/store";
import { HideLoader, ShowLoader } from "../redux/state-slice/settings-slice";
import axios from "axios";
import { ErrorToast } from "../helper/FormHelper";

import {
  SetCategoryListTotal,
  SetCategoryList,
} from "../redux/state-slice/category-slice";
import { BaseURL } from "../helper/config";
import { getToken } from "../helper/SessionHelper";

const AxiosHeaders = { headers: { token: getToken() } };

//---------------------- Category List API Request ------------------//
export async function CategoryListRequest(pageNo, perPage, searchKey) {
  try {
    store.dispatch(ShowLoader());
    const URL = `${BaseURL}CategoryList/${pageNo}/${perPage}/${searchKey}`;
    const result = await axios.get(URL, AxiosHeaders);

    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      if (result.data["data"]["Rows"].length > 0) {
        store.dispatch(SetCategoryList(result.data["data"]["Rows"]));
        store.dispatch(
          SetCategoryListTotal(result.data["data"]["Total"][0]["count"])
        );
      } else {
        store.dispatch(SetCategoryList([]));
        store.dispatch(SetCategoryListTotal(0));
        ErrorToast("No Category Found!");
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
