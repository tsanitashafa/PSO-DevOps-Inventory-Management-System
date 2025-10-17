/* -------------------------------------------------------------------------- */
/*                            Password Reset Module                           */
/* -------------------------------------------------------------------------- */

// Required Modules
const OTPSModel = require("../../models/Users/OTPSModel");


// User Password Reset Service
const UserResetPassService = async (Request, DataModel) => {
  // Getting Data from Request
  const email = Request.body["email"];
  const OTPCode = Request.body["OTP"];
  const NewPass = Request.body["password"];
  const statusUpdate = 1; 
  try {
    // Check User Email and OTP in OTP Collection
    const OTPUserCount = await OTPSModel.aggregate([
      { $match: { email: email, otp: OTPCode, status: statusUpdate } },
      { $count: "total" },
    ]);
    // If Exist then Update Password in User Collection
    if (OTPUserCount.length > 0) {
      const PassUpdate = await DataModel.updateOne(
        { email: email },
        { password: NewPass }
      );
      // Return Success
      return { status: "success", data: PassUpdate };
    } else {
      return { status: "fail", data: "Invalid Request" };
    }
  } catch (error) {
    return { status: "fail", data: error.toString() };
  }
};

module.exports = UserResetPassService;
