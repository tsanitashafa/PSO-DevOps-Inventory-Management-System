class SessionHelper {
  setToken(token) {
    localStorage.setItem("token", token);
  }
  getToken() {
    return localStorage.getItem("token");
  }
  removeToken() {
    localStorage.removeItem("token");
  }
  setUserData(userData) {
    localStorage.setItem("userData", JSON.stringify(userData));
  }
  getUserData() {
    return JSON.parse(localStorage.getItem("userData"));
  }
  removeUserData() {
    localStorage.clear();
    window.location.href = "/login";
  }
  setEmail(email) {
    localStorage.setItem("email", email);
  }
  getEmail() {
    return localStorage.getItem("email");
  }
  setOTP(OTP) {
    localStorage.setItem("OTP", OTP);
  }
  getOTP() {
    return localStorage.getItem("OTP");
  }
}
export const {
  getUserData,
  setUserData,
  removeUserData,
  setEmail,
  getEmail,
  getToken,
  setToken,
  setOTP,
  getOTP,
  removeToken,
} = new SessionHelper();
export default SessionHelper;
