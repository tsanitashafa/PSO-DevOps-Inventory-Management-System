import store from "../redux/store/store";
import { HideLoader, ShowLoader } from "../redux/state-slice/settings-slice";
import axios from "axios";
import { ErrorToast, SuccessToast } from "../helper/FormHelper";

import {
  SetExpenseListTotal,
  SetExpenseList,
  OnChangeExpenseInput,
  ResetExpenseFormValue,
  SetExpenseTypeDropDown,
} from "../redux/state-slice/expense-slice";
import { BaseURL } from "../helper/config";
import { getToken } from "../helper/SessionHelper";

const AxiosHeaders = { headers: { token: getToken() } };

//---------------------- Expense List API Request ------------------//
export async function ExpenseListRequest(pageNo, perPage, searchKey) {
  try {
    store.dispatch(ShowLoader());
    const URL = `${BaseURL}ExpenseList/${pageNo}/${perPage}/${searchKey}`;
    const result = await axios.get(URL, AxiosHeaders);

    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      if (result.data["data"]["Rows"].length > 0) {
        store.dispatch(SetExpenseList(result.data["data"]["Rows"]));
        store.dispatch(
          SetExpenseListTotal(result.data["data"]["Total"][0]["count"])
        );
      } else {
        store.dispatch(SetExpenseList([]));
        store.dispatch(SetExpenseListTotal(0));
        ErrorToast("No Expense Found!");
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

//---------------------- Create Expense  API Request ------------------//
export async function ExpenseSaveRequest(PostBody, ObjectID) {
  try {
    store.dispatch(ShowLoader());
    let URL = `${BaseURL}CreateExpenseList`;

    if (ObjectID !== 0) {
      URL = `${BaseURL}UpdateExpenseList/${ObjectID}`;
    }

    const result = await axios.post(URL, PostBody, AxiosHeaders);

    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      SuccessToast("Request Successful");
      store.dispatch(ResetExpenseFormValue());
      return true;
    } else if (result.status === 200 && result.data["status"] === "fail") {
      if (result.data["data"].includes("E11000")) {
        ErrorToast("Expense Name Already Exist");
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
export async function GetExpenseDetailRequest(ObjectID) {
  try {
    store.dispatch(ShowLoader());
    let URL = `${BaseURL}ExpenseListDetailsByID/${ObjectID}`;

    const result = await axios.get(URL, AxiosHeaders);

    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      if (result.status === 200 && result.data["status"] === "success") {
        let FormValue = result.data["data"][0];
        store.dispatch(
          OnChangeExpenseInput({ Name: "TypeID", Value: FormValue["TypeID"] })
        );
        store.dispatch(
          OnChangeExpenseInput({ Name: "Amount", Value: FormValue["Amount"] })
        );
        store.dispatch(
          OnChangeExpenseInput({ Name: "Note", Value: FormValue["Note"] })
        );
        return true;
      } else {
        ErrorToast("Request Fail ! Try Again");
        return false;
      }
    }
  } catch (e) {
    ErrorToast("Something Went Wrong!" + e.message);
    store.dispatch(HideLoader());
    return false;
  }
}

//---------------------- Delete Expense API Request ------------------//
export async function DeleteExpenseRequest(ObjectID) {
  try {
    store.dispatch(ShowLoader());
    let URL = `${BaseURL}DeleteExpenseList/${ObjectID}`;

    const result = await axios.get(URL, AxiosHeaders);
    console.log(result);
    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "associate") {
      ErrorToast(result.data["data"]);
      return false;
    }
    if (result.status === 200 && result.data["status"] === "success") {
      SuccessToast("Category deleted successfully");
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
