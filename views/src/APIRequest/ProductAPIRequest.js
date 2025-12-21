import store from "../redux/store/store";
import { HideLoader, ShowLoader } from "../redux/state-slice/settings-slice";
import axios from "axios";
import { ErrorToast, SuccessToast } from "../helper/FormHelper";

import {
  SetProductListTotal,
  SetProductList,
  ResetProductFormValue,
  OnChangeProductInput,
  SetProductCategoryDropDown,
  SetProductBrandDropDown,
} from "../redux/state-slice/product-slice";
import { BaseURL } from "../helper/config";
import { getToken } from "../helper/SessionHelper";
import { SetProductDropDown } from "../redux/state-slice/purchase-slice";

const AxiosHeaders = { headers: { token: getToken() } };

//---------------------- Product List API Request ------------------//
export async function ProductListRequest(pageNo, perPage, searchKey) {
  try {
    store.dispatch(ShowLoader());
    const URL = `${BaseURL}ProductList/${pageNo}/${perPage}/${searchKey}`;
    const result = await axios.get(URL, AxiosHeaders);

    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      if (result.data["data"]["Rows"].length > 0) {
        store.dispatch(SetProductList(result.data["data"]["Rows"]));
        store.dispatch(
          SetProductListTotal(result.data["data"]["Total"][0]["count"])
        );
      } else {
        store.dispatch(SetProductList([]));
        store.dispatch(SetProductListTotal(0));
        ErrorToast("No Product Found!");
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

//---------------------- Create Product  API Request ------------------//
export async function ProductSaveRequest(PostBody, ObjectID) {
  try {
    store.dispatch(ShowLoader());
    let URL = `${BaseURL}CreateProduct`;

    if (ObjectID !== 0) {
      URL = `${BaseURL}UpdateProduct/${ObjectID}`;
    }

    const result = await axios.post(URL, PostBody, AxiosHeaders);

    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      SuccessToast("Request Successful");
      store.dispatch(ResetProductFormValue());
      return true;
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



//---------------------- Get Product Detail  API Request ------------------//
export async function GetProductDetailRequest(ObjectID) {
  try {
    store.dispatch(ShowLoader());
    let URL = `${BaseURL}ProductDetailsByID/${ObjectID}`;

    const result = await axios.get(URL, AxiosHeaders);

    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      let FormValue = result.data["data"][0];
      store.dispatch(
        OnChangeProductInput({
          Name: "CategoryID",
          Value: FormValue["CategoryID"],
        })
      );
      store.dispatch(
        OnChangeProductInput({ Name: "BrandID", Value: FormValue["BrandID"] })
      );
      store.dispatch(
        OnChangeProductInput({ Name: "Name", Value: FormValue["Name"] })
      );
      store.dispatch(
        OnChangeProductInput({ Name: "Unit", Value: FormValue["Unit"] })
      );
      store.dispatch(
        OnChangeProductInput({ Name: "Details", Value: FormValue["Details"] })
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
// ---------------------- Product Category DropDown  API Request ------------------//
export async function ProductCategoryDropDownRequest() {
  try {
    store.dispatch(ShowLoader());
    let URL = BaseURL + "/CategoryDropDown";
    const result = await axios.get(URL, AxiosHeaders);
    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      if (result.data["data"].length > 0) {
        store.dispatch(SetProductCategoryDropDown(result.data["data"]));
      } else {
        store.dispatch(SetProductCategoryDropDown([]));
        ErrorToast("No Product Category Found");
      }
    } else {
      ErrorToast("Something Went Wrong");
    }
  } catch (e) {
    ErrorToast("Something Went Wrong");
    store.dispatch(HideLoader());
  }
}

// ---------------------- Product Brand DropDown  API Request ------------------//
export async function ProductBrandDropDownRequest() {
  try {
    store.dispatch(ShowLoader());
    let URL = BaseURL + "/BrandDropDown";
    const result = await axios.get(URL, AxiosHeaders);
    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "success") {
      if (result.data["data"].length > 0) {
        store.dispatch(SetProductBrandDropDown(result.data["data"]));
      } else {
        store.dispatch(SetProductBrandDropDown([]));
        ErrorToast("No Product Brand Found");
      }
    } else {
      ErrorToast("Something Went Wrong");
    }
  } catch (e) {
    ErrorToast("Something Went Wrong");
    store.dispatch(HideLoader());
  }
}

//---------------------- Delete Product API Request ------------------//
export async function DeleteProductRequest(ObjectID) {
  try {
    store.dispatch(ShowLoader());
    let URL = `${BaseURL}DeleteProduct/${ObjectID}`;

    const result = await axios.get(URL, AxiosHeaders);

    store.dispatch(HideLoader());
    if (result.status === 200 && result.data["status"] === "associate") {
      ErrorToast(result.data["data"]);
      return false;
    }
    if (result.status === 200 && result.data["status"] === "success") {
      SuccessToast("Product deleted successfully");
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