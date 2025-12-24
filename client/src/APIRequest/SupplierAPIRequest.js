import store from "../redux/store/store";
import { HideLoader, ShowLoader } from "../redux/state-slice/settings-slice";
import axios from "axios";
import { ErrorToast, SuccessToast } from "../helper/FormHelper";

import {
  SetSupplierListTotal,
  SetSupplierList,
  ResetSupplierFormValue,
  OnChangeSupplierInput,
} from "../redux/state-slice/supplier-slice";
import { BaseURL } from "../helper/config";
import { getToken } from "../helper/SessionHelper";
import { SetSupplierDropDown } from "../redux/state-slice/purchase-slice";

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

// ---------------------- Supplier DropDown  API Request ------------------//
export async function SupplierDropDownRequest() {
  try {
    store.dispatch(ShowLoader());
    let URL = BaseURL + "/SupplierDropDown";
    const result = await axios.get(URL, AxiosHeaders);
    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      if (result.data["data"].length > 0) {
        store.dispatch(SetSupplierDropDown(result.data["data"]));
      } else {
        store.dispatch(SetSupplierDropDown([]));
        ErrorToast("No Supplier Found");
      }
    } else {
      ErrorToast("Something Went Wrong");
    }
  } catch (e) {
    ErrorToast("Something Went Wrong");
    store.dispatch(HideLoader());
  }
}

//---------------------- Create Supplier  API Request ------------------//
export async function SupplierSaveRequest(PostBody, ObjectID) {
  try {
    store.dispatch(ShowLoader());
    let URL = `${BaseURL}CreateSupplier`;

    if (ObjectID !== 0) {
      URL = `${BaseURL}UpdateSupplier/${ObjectID}`;
    }

    const result = await axios.post(URL, PostBody, AxiosHeaders);

    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      SuccessToast("Request Successful");
      store.dispatch(ResetSupplierFormValue());
      return true;
    } else if (result.status === 200 && result.data["status"] === "fail") {
      if (result.data["data"].includes("E11000")) {
        ErrorToast("Supplier Name Already Exist");
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
//---------------------- Get Supplier  API Request ------------------//
export async function GetSupplierDetailsRequest(ObjectID) {
  try {
    store.dispatch(ShowLoader());
    let URL = `${BaseURL}SupplierDetailsByID/${ObjectID}`;

    const result = await axios.get(URL, AxiosHeaders);

    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      let FormValue = result.data["data"][0];
      store.dispatch(
        OnChangeSupplierInput({ Name: "Name", Value: FormValue["Name"] })
      );
      store.dispatch(
        OnChangeSupplierInput({ Name: "Phone", Value: FormValue["Phone"] })
      );
      store.dispatch(
        OnChangeSupplierInput({ Name: "Email", Value: FormValue["Email"] })
      );
      store.dispatch(
        OnChangeSupplierInput({ Name: "Address", Value: FormValue["Address"] })
      );
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

//---------------------- Delete Supplier API Request ------------------//
export async function DeleteSupplierRequest(ObjectID) {
  try {
    store.dispatch(ShowLoader());
    let URL = `${BaseURL}DeleteSupplier/${ObjectID}`;

    const result = await axios.get(URL, AxiosHeaders);
    console.log(result);
    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "associate") {
      ErrorToast(result.data["data"]);
      return false;
    }
    if (result.status === 200 && result.data["status"] === "success") {
      SuccessToast("Request Successful");
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
 