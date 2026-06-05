import store from "../redux/store/store";
import { HideLoader, ShowLoader } from "../redux/state-slice/settings-slice";
import axios from "axios";
import { ErrorToast, SuccessToast } from "../helper/FormHelper";

import {
  SetCustomerListTotal,
  SetCustomerList,
  OnChangeCustomerInput,
  ResetFromValue,
} from "../redux/state-slice/customer-slice";
import { BaseURL } from "../helper/config";
import { getToken } from "../helper/SessionHelper";
import { SetCustomerDropDown } from "../redux/state-slice/return-slice";

const AxiosHeaders = { headers: { token: getToken() } };

//---------------------- Customer List API Request ------------------//
export async function CustomerListRequest(pageNo, perPage, searchKey) {
  try {
    store.dispatch(ShowLoader());
    const URL = `${BaseURL}CustomerList/${pageNo}/${perPage}/${searchKey}`;
    const result = await axios.get(URL, AxiosHeaders);
    console.log(result);
    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      if (result.data["data"]["Rows"].length > 0) {
        store.dispatch(SetCustomerList(result.data["data"]["Rows"]));
        store.dispatch(
          SetCustomerListTotal(result.data["data"]["Total"][0]["count"])
        );
      } else {
        store.dispatch(SetCustomerList([]));
        store.dispatch(SetCustomerListTotal(0));
        ErrorToast("No Customer Found!");
      }
    } else {
      ErrorToast("Failed to fetch data!");
    }
  } catch (e) {
    ErrorToast("Something Went Wrong! " + e.message);
    store.dispatch(HideLoader());
    return false;
  }
}

//---------------------- Create Customer  API Request ------------------//
export async function CustomerSaveRequest(PostBody, ObjectID) {
  try {
    store.dispatch(ShowLoader());
    let URL = `${BaseURL}CreateCustomer`;

    if (ObjectID !== 0) {
      URL = `${BaseURL}UpdateCustomer/${ObjectID}`;
    }

    const result = await axios.post(URL, PostBody, AxiosHeaders);

    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      SuccessToast("Customer saved Successfully!");
      store.dispatch(ResetFromValue());

      return true;
    } else {
      ErrorToast("Failed to Create Customer!");
      return false;
    }
  } catch (e) {
    ErrorToast("Something Went Wrong!");
    store.dispatch(HideLoader());
    return false;
  }
}


//---------------------- Get Customer  API Request ------------------//
export async function GetCustomerRequest(ObjectID) {
  try {
    store.dispatch(ShowLoader());
    let URL = `${BaseURL}CustomerDetailsByID/${ObjectID}`;

    const result = await axios.get(URL, AxiosHeaders);

    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      const CustomerData = result.data["data"][0];
      store.dispatch(
        OnChangeCustomerInput({
          name: "CustomerName",
          value: CustomerData.CustomerName,
        })
      );
      store.dispatch(
        OnChangeCustomerInput({ name: "Phone", value: CustomerData.Phone })
      );
      store.dispatch(
        OnChangeCustomerInput({ name: "Email", value: CustomerData.Email })
      );
      store.dispatch(
        OnChangeCustomerInput({ name: "Address", value: CustomerData.Address })
      );

      return true;
    } else {
      ErrorToast("Failed to fetch Customer data!");
      return false;
    }
  } catch (e) {
    ErrorToast("Something Went Wrong!" + e.message);
    store.dispatch(HideLoader());
    return false;
  }
}

//---------------------- Delete Customer API Request ------------------//
export async function DeleteCustomerRequest(ObjectID) {
  try {
    store.dispatch(ShowLoader());
    let URL = `${BaseURL}DeleteCustomer/${ObjectID}`;

    const result = await axios.get(URL, AxiosHeaders);
    console.log(result);
    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "associate") {
      ErrorToast(result.data["data"]);
      return false;
    } else if (result.status === 200 && result.data["status"] === "success") {
      SuccessToast("Customer Deleted Successfully!");
      return true;
    } else {
      ErrorToast("Failed to Delete Customer!");
      return false;
    }
  } catch (e) {
    ErrorToast("Something Went Wrong!" + e.message);
    store.dispatch(HideLoader());
    return false;
  }
}
 