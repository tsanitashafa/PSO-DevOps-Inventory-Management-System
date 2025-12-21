import store from "../redux/store/store";
import { HideLoader, ShowLoader } from "../redux/state-slice/settings-slice";
import axios from "axios";
import { ErrorToast, SuccessToast } from "../helper/FormHelper";

import {
  SetPurchaseListTotal,
  SetPurchaseList,
  SetProductDropDown,
} from "../redux/state-slice/purchase-slice";
import { BaseURL } from "../helper/config";
import { getToken } from "../helper/SessionHelper";

const AxiosHeaders = { headers: { token: getToken() } };

//---------------------- Purchase List API Request -----------------------//
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

// ---------------------- Product DropDown  API Request ------------------//
export async function ProductDropDownRequest() {
  try {
    store.dispatch(ShowLoader());
    let URL = BaseURL + "/ProductDropDown";
    const result = await axios.get(URL, AxiosHeaders);

    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      if (result.data["data"].length > 0) {
        store.dispatch(SetProductDropDown(result.data["data"]));
      } else {
        store.dispatch(SetProductDropDown([]));
        ErrorToast("No Product Found");
      }
    } else {
      ErrorToast("Something Went Wrong");
    }
  } catch (e) {
    ErrorToast("Something Went Wrong");
    store.dispatch(HideLoader());
  }
}
//---------------------- Create Purchase API Request ------------------//
export async function PurchaseSaveRequest(ParentBody, ChildsBody) {
  try {
    store.dispatch(ShowLoader());
    let PostBody = { Parent: ParentBody, Childs: ChildsBody };
    let URL = BaseURL + "/CreatePurchase";
    const result = await axios.post(URL, PostBody, AxiosHeaders);
    console.log(result.data["status"]);
    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      SuccessToast("Request Successful");
      return true;
    } else {
      ErrorToast("Request Fail ! Try Again");
      return false;
    }
  } catch (e) {
    ErrorToast("Something Went Wrong");
    store.dispatch(HideLoader());
    return false;
  }
}
