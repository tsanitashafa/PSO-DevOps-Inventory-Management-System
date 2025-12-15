import store from "../redux/store/store";
import { HideLoader, ShowLoader } from "../redux/state-slice/settings-slice";
import axios from "axios";
import { ErrorToast } from "../helper/FormHelper";

import {
  SetReturnListTotal,
  SetReturnList,
} from "../redux/state-slice/return-slice";
import { BaseURL } from "../helper/config";
import { getToken } from "../helper/SessionHelper";

const AxiosHeaders = { headers: { token: getToken() } };

//---------------------- Return List API Request ------------------//
export async function ReturnListRequest(pageNo, perPage, searchKey) {
  try {
    store.dispatch(ShowLoader());
    const URL = `${BaseURL}ReturnList/${pageNo}/${perPage}/${searchKey}`;
    const result = await axios.get(URL, AxiosHeaders);

    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      if (result.data["data"]["Rows"].length > 0) {
        store.dispatch(SetReturnList(result.data["data"]["Rows"]));
        store.dispatch(
          SetReturnListTotal(result.data["data"]["Total"][0]["count"])
        );
      } else {
        store.dispatch(SetReturnList([]));
        store.dispatch(SetReturnListTotal(0));
        ErrorToast("No Return Found!");
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
