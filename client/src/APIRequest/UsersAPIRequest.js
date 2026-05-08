import axios from "axios";
import { ErrorToast, SuccessToast } from "../helper/FormHelper";
import store from "../redux/store/store";
import { HideLoader, ShowLoader } from "../redux/state-slice/settings-slice";
import {
  getToken,
  setEmail,
  setOTP,
  setToken,
  setUserData,
} from "../helper/SessionHelper";
import { SetProfile } from "../redux/state-slice/profile-slice";
import { BaseURL } from "../helper/config";

const AxiosHeader = { headers: { token: getToken() } };

export async function LoginRequest(email, password) {
  try {
    store.dispatch(ShowLoader());
    const URL = BaseURL + "/Login";
    const PostBody = { email: email, password: password };
    const res = await axios.post(URL, PostBody);
    if (res.status === 200) {
      if (res.data["status"] === "fail") {
        ErrorToast("Invalid Email or Password");
        store.dispatch(HideLoader());
        return false;
      } else {
        setToken(res.data["token"]);

        const profileRes = await axios.get(BaseURL + "/ProfileDetails", {
          headers: { token: res.data["token"] },
        });
        
        setUserData(profileRes.data["data"][0]);
        store.dispatch(HideLoader());
        return true;
      }
    } else {
      store.dispatch(HideLoader());
      ErrorToast("Something Went Wrong");
      return false;
    }
  } catch (e) {
    store.dispatch(HideLoader());
    ErrorToast("Invalid Email or Password");
    return false;
  }
}

export async function RegistrationRequest(
  email,
  firstName,
  lastName,
  mobile,
  password,
  photo
) {
  try {
    store.dispatch(ShowLoader());
    const URL = BaseURL + "/Registration";
    const PostBody = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      mobile: mobile,
      password: password,
      photo: photo,
    };
    const res = await axios.post(URL, PostBody);
    store.dispatch(HideLoader());
    if (res.status === 200) {
      if (res.data["status"] === "fail") {
        if (res.data["data"]["keyPattern"]["email"] === 1) {
          ErrorToast("Email Already Exist");
          return false;
        } else {
          ErrorToast("Something Went Wrong");
          return false;
        }
      } else {
        SuccessToast("Registration Success");
        return true;
      }
    } else {
      ErrorToast("Something Went Wrong");
      return false;
    }
  } catch (e) {
    store.dispatch(HideLoader());
    ErrorToast("Something Went Wrong");
    return false;
  }
}

export async function GetProfileDetails() {
  try {
    store.dispatch(ShowLoader());
    const URL = BaseURL + "/ProfileDetails";
    const res = await axios.get(URL, AxiosHeader);
    store.dispatch(HideLoader());
    if (res.status === 200) {
      store.dispatch(SetProfile(res.data["data"][0]));
    } else {
      ErrorToast("Something Went Wrong");
    }
  } catch (e) {
    store.dispatch(HideLoader());
    ErrorToast("Something Went Wrong");
  }
}

export async function ProfileUpdateRequest(
  email,
  firstName,
  lastName,
  mobile,
  password,
  photo
) {
  try {
    store.dispatch(ShowLoader());
    const URL = BaseURL + "/ProfileUpdate";
    const PostBody = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      mobile: mobile,
      password: password,
      photo: photo,
    };
    const UserDetails = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      mobile: mobile,
      photo: photo,
    };
    const res = await axios.post(URL, PostBody, AxiosHeader);
    store.dispatch(HideLoader());
    if (res.status === 200) {
      SuccessToast("Profile Update Success");
      setUserData(UserDetails);
      return true;
    } else {
      ErrorToast("Something Went Wrong");
      return false;
    }
  } catch (e) {
    ErrorToast("Something Went Wrong");
    store.dispatch(HideLoader());
    return false;
  }
}

export async function RecoverVerifyEmailRequest(email) {
  try {
    store.dispatch(ShowLoader());
    const URL = BaseURL + "/RecoverVerifyEmail/" + email;
    const res = await axios.get(URL);
    store.dispatch(HideLoader());
    if (res.status === 200) {
      if (res.data["status"] === "fail") {
        ErrorToast("No user found");
        return false;
      } else {
        setEmail(email);
        SuccessToast(
          "A 6 Digit verification code has been sent to your email address. "
        );
        return true;
      }
    } else {
      ErrorToast("Something Went Wrong");
      return false;
    }
  } catch (e) {
    ErrorToast("Something Went Wrong");
    store.dispatch(HideLoader());
    return false;
  }
}

export async function RecoverVerifyOTPRequest(email, OTP) {
  try {
    store.dispatch(ShowLoader());
    const URL = BaseURL + "/RecoverVerifyOTP/" + email + "/" + OTP;
    const res = await axios.get(URL);
    store.dispatch(HideLoader());
    if (res.status === 200) {
      if (res.data["status"] === "fail") {
        ErrorToast("Code Verification Fail");
        return false;
      } else {
        setOTP(OTP);
        SuccessToast("Code Verification Success");
        return true;
      }
    } else {
      ErrorToast("Something Went Wrong");
      return false;
    }
  } catch (e) {
    ErrorToast("Something Went Wrong");
    store.dispatch(HideLoader());

    return false;
  }
}

export async function RecoverResetPassRequest(email, OTP, password) {
  try {
    store.dispatch(ShowLoader());
    const URL = BaseURL + "/RecoverResetPass";
    const PostBody = { email: email, OTP: OTP, password: password };
    const res = await axios.post(URL, PostBody);
    store.dispatch(HideLoader());
    if (res.status === 200) {
      if (res.data["status"] === "fail") {
        ErrorToast(res.data["data"]);
        return false;
      } else {
        setOTP(OTP);
        SuccessToast("NEW PASSWORD CREATED");
        return true;
      }
    } else {
      ErrorToast("Something Went Wrong");
      return false;
    }
  } catch (e) {
    ErrorToast("Something Went Wrong");
    store.dispatch(HideLoader());
    return false;
  }
}
