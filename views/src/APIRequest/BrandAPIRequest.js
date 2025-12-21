import store from "../redux/store/store";
import { HideLoader, ShowLoader } from "../redux/state-slice/settings-slice";
import axios from "axios";
import { ErrorToast, SuccessToast } from "../helper/FormHelper";

import {
  SetBrandListTotal,
  SetBrandList,
  ResetBrandFormValue,
  OnChangeBrandInput,
} from "../redux/state-slice/brand-slice";
import { BaseURL } from "../helper/config";
import { getToken } from "../helper/SessionHelper";
import { ResetFromValue } from "../redux/state-slice/customer-slice";

const AxiosHeaders = { headers: { token: getToken() } };

//---------------------- Brand List API Request ------------------//
export async function BrandListRequest(pageNo, perPage, searchKey) {
  try {
    store.dispatch(ShowLoader());
    const URL = `${BaseURL}BrandList/${pageNo}/${perPage}/${searchKey}`;
    const result = await axios.get(URL, AxiosHeaders);

    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      if (result.data["data"]["Rows"].length > 0) {
        store.dispatch(SetBrandList(result.data["data"]["Rows"]));
        store.dispatch(
          SetBrandListTotal(result.data["data"]["Total"][0]["count"])
        );
      } else {
        store.dispatch(SetBrandList([]));
        store.dispatch(SetBrandListTotal(0));
        ErrorToast("No Brand Found!");
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

//---------------------- Create Brand  API Request ------------------//
export async function BrandSaveRequest(PostBody, ObjectID) {
  try {
    store.dispatch(ShowLoader());
    let URL = `${BaseURL}CreateBrand`;

    if (ObjectID !== 0) {
      URL = `${BaseURL}UpdateBrand/${ObjectID}`;
    }

    const result = await axios.post(URL, PostBody, AxiosHeaders);

    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      SuccessToast("Request Successful");
      store.dispatch(ResetBrandFormValue());
      return true;
    } else if (result.status === 200 && result.data["status"] === "fail") {
      if (result.data["data"].includes("E11000")) {
        ErrorToast("Brand Name Already Exist");
        return false;
      }
    } else {
      ErrorToast("Request Fail ! Try Again");
      return false;
    }
  } catch (e) {
    ErrorToast("Something Went Wrong!");
    store.dispatch(HideLoader());
    return false;
  }
}
//---------------------- Get Brand Detail  API Request ------------------//
export async function GetBrandDetailRequest(ObjectID) {
  try {
    store.dispatch(ShowLoader());
    let URL = `${BaseURL}BrandDetailsByID/${ObjectID}`;

    const result = await axios.get(URL, AxiosHeaders);

    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      let FormValue = result.data["data"][0];
      store.dispatch(
        OnChangeBrandInput({ Name: "Name", Value: FormValue["Name"] })
      );
      return true;
    } else {
      ErrorToast("Request Fail ! Failed to fetch Brand data!");
      return false;
    }
  } catch (e) {
    ErrorToast("Something Went Wrong!" + e.message);
    store.dispatch(HideLoader());
    return false;
  }
}

//---------------------- Delete Brand API Request ------------------//
export async function DeleteBrandRequest(ObjectID) {
  try {
    store.dispatch(ShowLoader());
    let URL = `${BaseURL}DeleteBrand/${ObjectID}`;

    const result = await axios.get(URL, AxiosHeaders);
    console.log(result);
    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "associate") {
      ErrorToast(result.data["data"]);
      return false;
    }
    if (result.status === 200 && result.data["status"] === "success") {
      SuccessToast("Brand deleted successfully");
      return true;
    } else {
      ErrorToast("Request Fail ! Try Again");
      return false;
    }
  } catch (e) {
    ErrorToast("Something Went Wrong!" + e.message);
    store.dispatch(HideLoader());
    return false;
  }
}
 