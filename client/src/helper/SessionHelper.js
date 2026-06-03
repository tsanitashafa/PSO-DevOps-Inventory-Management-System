class SessionHelper {
  static setToken(token) {
    sessionStorage.setItem("token", token);
  }
  static getToken() {
    return sessionStorage.getItem("token");
  }
  static removeToken() {
    sessionStorage.removeItem("token");
  }
  static setUserData(userData) {
    sessionStorage.setItem("userData", JSON.stringify(userData));
  }
  static getUserData() {
    const data = sessionStorage.getItem("userData");
  
    return data && data !== "undefined"
      ? JSON.parse(data)
      : {};
  }
  static removeUserData() {
    sessionStorage.clear();
    window.location.href = "/login";
  }
  static setEmail(email) {
    sessionStorage.setItem("email", email);
  }
  static getEmail() {
    return sessionStorage.getItem("email");
  }
  static setOTP(OTP) {
    sessionStorage.setItem("OTP", OTP);
  }
  static getOTP() {
    return sessionStorage.getItem("OTP");
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
} = SessionHelper;
