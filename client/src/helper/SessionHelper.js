class SessionHelper {
  static setToken(token) {
    localStorage.setItem("token", token);
  }
  static getToken() {
    return localStorage.getItem("token");
  }
  static removeToken() {
    localStorage.removeItem("token");
  }
  static setUserData(userData) {
    localStorage.setItem("userData", JSON.stringify(userData));
  }
  static getUserData() {
    const data = localStorage.getItem("userData");
    return data ? JSON.parse(data) : {};
  }
  static removeUserData() {
    localStorage.clear();
    window.location.href = "/login";
  }
  static setEmail(email) {
    localStorage.setItem("email", email);
  }
  static getEmail() {
    return localStorage.getItem("email");
  }
  static setOTP(OTP) {
    localStorage.setItem("OTP", OTP);
  }
  static getOTP() {
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
} = SessionHelper;
