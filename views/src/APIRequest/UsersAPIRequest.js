import axios from "axios";
import FormHelper from "../helper/FormHelper";
import store from "../redux/store/store";
import { HideLoader, ShowLoader } from "../redux/state-slice/settings-slice";
import { getToken, setToken, setUserData } from "../helper/SessionHelper";
import { setProfile } from "../redux/state-slice/profile-slice";

// Base URL
const BASE_URL = "/api/v1";

// Generate fresh header on every request
const getAxiosHeader = () => ({
  headers: { token: getToken() },
});

//--------- Login user -----------//
export async function LoginRequest(loginData) {
  store.dispatch(ShowLoader());
  const URl = BASE_URL + "/login";

  try {
    const res = await axios.post(URl, loginData);

    store.dispatch(HideLoader());

    if (res.status === 200) {
      setToken(res.data.token);
      setUserData(res.data.data);
      FormHelper.successToast("Login Success!");
    } else {
      FormHelper.errorToast("Invalid credentials!");
      return false;
    }
  } catch (e) {
    store.dispatch(HideLoader());
    FormHelper.errorToast("Something went wrong!");
    console.error(e);
    return false;
  }
}

//--------- Registration user -----------//
export async function RegistrationRequest(userData) {
  store.dispatch(ShowLoader());
  const URl = BASE_URL + "/registration";

  const PostBody = {
    ...userData,
    photo: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCE...", // keep yours
  };

  try {
    const res = await axios.post(URl, PostBody);

    store.dispatch(HideLoader());

    if (res.data.status === "fail") {
      if (res.data.message.includes("E11000")) {
        FormHelper.errorToast("Email Already Exist!");
      } else {
        FormHelper.errorToast("Something went wrong!");
      }
      return false;
    } else {
      FormHelper.successToast("Registration Success!");
    }
  } catch (e) {
    store.dispatch(HideLoader());
    console.error(e);
    FormHelper.errorToast("Something went wrong!");
    return false;
  }
}

//--------- Get Profile -----------//
export async function GetProfileRequest() {
  store.dispatch(ShowLoader());
  const URl = BASE_URL + "/ProfileDetails";

  try {
    const res = await axios.get(URl, getAxiosHeader());

    store.dispatch(HideLoader());

    if (res.status === 200) {
      store.dispatch(setProfile(res.data.data));
    } else {
      FormHelper.errorToast("Failed to fetch profile!");
      return false;
    }
  } catch (e) {
    store.dispatch(HideLoader());
    console.error(e);
    FormHelper.errorToast("Failed to fetch profile!");
    return false;
  }
}

//--------- Update Profile -----------//
export async function UpdateProfileRequest(profileData) {
  store.dispatch(ShowLoader());
  const URl = BASE_URL + "/profileUpdate";

  try {
    const res = await axios.post(URl, profileData, getAxiosHeader());

    store.dispatch(HideLoader());

    if (res.status === 200) {
      FormHelper.successToast("Profile Updated Successfully!");
      return true;
    } else {
      FormHelper.errorToast("Update failed!");
      return false;
    }
  } catch (e) {
    store.dispatch(HideLoader());
    console.error(e);
    FormHelper.errorToast("Update failed!");
    return false;
  }
}
