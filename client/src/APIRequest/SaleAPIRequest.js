import store from "../redux/store/store";
import { HideLoader, ShowLoader } from "../redux/state-slice/settings-slice";
import axios from "axios";
import { ErrorToast, SuccessToast } from "../helper/FormHelper";

import {
  SetSaleListTotal,
  SetSaleList,
  SetCustomerDropDown,
  SetProductDropDown,
} from "../redux/state-slice/sale-slice";
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
// ---------------------- Customer DropDown  API Request ------------------//
export async function CustomerDropDownRequest() {
  try {
    store.dispatch(ShowLoader());
    const URL = BaseURL + "/CustomerDropDown";
    const result = await axios.get(URL, AxiosHeaders);
    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      if (result.data["data"].length > 0) {
        store.dispatch(SetCustomerDropDown(result.data["data"]));
      } else {
        store.dispatch(SetCustomerDropDown([]));
        ErrorToast("No Customer Found");
      }
    } else {
      ErrorToast("Something Went Wrong");
    }
  } catch (e) {
    ErrorToast("Something Went Wrong");
    store.dispatch(HideLoader());
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
//---------------------- Save Sale  API Request ------------------//
export async function SaleSaveRequest(ParentBody, ChildsBody) {
  try {
    store.dispatch(ShowLoader());
    let PostBody = { Parent: ParentBody, Childs: ChildsBody };
    let URL = BaseURL + "/CreateSale";
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
