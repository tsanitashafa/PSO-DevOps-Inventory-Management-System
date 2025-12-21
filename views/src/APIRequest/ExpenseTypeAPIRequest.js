import store from "../redux/store/store";
import { HideLoader, ShowLoader } from "../redux/state-slice/settings-slice";
import axios from "axios";
import { ErrorToast, SuccessToast } from "../helper/FormHelper";

import {
  SetExpenseTypeListTotal,
  SetExpenseTypeList,
  ResetExpenseTypeFormValue,
  OnChangeExpenseTypeInput,
} from "../redux/state-slice/expensetype-slice";
import { BaseURL } from "../helper/config";
import { getToken } from "../helper/SessionHelper";
import { SetExpenseTypeDropDown } from "../redux/state-slice/expense-slice";

const AxiosHeaders = { headers: { token: getToken() } };

//---------------------- ExpenseType List API Request ------------------//
export async function ExpenseTypeListRequest(pageNo, perPage, searchKey) {
  try {
    store.dispatch(ShowLoader());
    const URL = `${BaseURL}ExpenseTypeList/${pageNo}/${perPage}/${searchKey}`;
    const result = await axios.get(URL, AxiosHeaders);

    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      if (result.data["data"]["Rows"].length > 0) {
        store.dispatch(SetExpenseTypeList(result.data["data"]["Rows"]));
        store.dispatch(
          SetExpenseTypeListTotal(result.data["data"]["Total"][0]["count"])
        );
      } else {
        store.dispatch(SetExpenseTypeList([]));
        store.dispatch(SetExpenseTypeListTotal(0));
        ErrorToast("No ExpenseType Found!");
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


//---------------------- Create Expense Type  API Request ------------------//
export async function ExpenseTypeSaveRequest(PostBody, ObjectID) {
  try {
    store.dispatch(ShowLoader());
    let URL = `${BaseURL}CreateExpenseType`;

    if (ObjectID !== 0) {
      URL = `${BaseURL}UpdateExpenseType/${ObjectID}`;
    }

    const result = await axios.post(URL, PostBody, AxiosHeaders);

    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      SuccessToast("Request Successful");
      store.dispatch(ResetExpenseTypeFormValue());
      return true;
    } else if (result.status === 200 && result.data["status"] === "fail") {
       if (result.data["data"].includes("E11000")) {
         ErrorToast("Expense  Already Exist");
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
// ---------------------- Expense Type DropDown  API Request ------------------//
export async function ExpenseTypeDropDownRequest() {
  try {
    store.dispatch(ShowLoader());
    let URL = BaseURL + "/ExpenseTypeDropDown";
    const result = await axios.get(URL, AxiosHeaders);
    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      if (result.data["data"].length > 0) {
        store.dispatch(SetExpenseTypeDropDown(result.data["data"]));
      } else {
        store.dispatch(SetExpenseTypeDropDown([]));
        ErrorToast("No Expense Type Found");
      }
    } else {
      ErrorToast("Something Went Wrong");
    }
  } catch (e) {
    ErrorToast("Something Went Wrong");
    store.dispatch(HideLoader());
  }
}

//---------------------- Get Expense Detail  API Request ------------------//
export async function GetExpenseTypeDetailRequest(ObjectID) {
  try {
    store.dispatch(ShowLoader());
    let URL = `${BaseURL}ExpenseTypeDetailsByID/${ObjectID}`;

    const result = await axios.get(URL, AxiosHeaders);

    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      let FormValue = result.data["data"][0];
      store.dispatch(
        OnChangeExpenseTypeInput({ Name: "Name", Value: FormValue["Name"] })
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

//---------------------- Delete Expense API Request ------------------//
export async function DeleteExpenseTypeRequest(ObjectID) {
  try {
    store.dispatch(ShowLoader());
    let URL = `${BaseURL}DeleteExpenseType/${ObjectID}`;

    const result = await axios.get(URL, AxiosHeaders);

    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "associate") {
      ErrorToast(result.data["data"]);
      return false;
    }
    if (result.status === 200 && result.data["status"] === "success") {
      SuccessToast("Expense Type deleted successfully");
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
 