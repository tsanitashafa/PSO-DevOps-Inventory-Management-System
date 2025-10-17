/* -------------------------------------------------------------------------- */
/*                           OTP Verification module                          */
/* -------------------------------------------------------------------------- */
// Required Modules

const UserVerifyOtpService = async (Request, DataModel) => {


  try {
    // Get email and OTP from request params
    const email = Request.params.email; // User Email from Request
    const OTPCode = Request.params.otp; // OTP from Request
    const status = 0;
    const statusUpdate = 1;

    // Checking OTP in OTP collection
    const OTPCount = await DataModel.aggregate([
      { $match: { email: email, otp: OTPCode, status: status } },
      { $count: "total" },
    ]);

    // If OTP found updating OTP,Email and Status
    if (OTPCount.length > 0) {
      const OTPUpdate = await DataModel.updateOne(
        {
          // finding record
          email: email,
          otp: OTPCode,
          status: status,
        },
        // updating record
        { email: email, otp: OTPCode, status: statusUpdate }
      );
      return { status: "success", data: OTPUpdate };
    } else {
      // If OTP not found return invalid OTP
      return { status: "fail", data: "Invalid OTP" };
    }
  } catch (error) {
    // Return Error
    return { status: "fail", data: error.toString() };
  }
};
// Exporting Module
module.exports = UserVerifyOtpService;
