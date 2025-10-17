/* -------------------------------------------------------------------------- */
/*                             Email Verification module                      */
/* -------------------------------------------------------------------------- */
const SendEmailUtility = require("../../utilities/SendEmailUtility");
const OTPSModel = require("../../models/Users/OTPSModel");

// User Email Verification Service
const UserVerifyEmailService = async (Request, DataModel) => {
  try {
    // Getting Data from Request
    const email = Request.params.email;

    // Generate Random 6 Digit OTP
    const OTPCode = Math.floor(100000 + Math.random() * 900000);

    // Check User Email in User Collection
    const UserCount = await DataModel.aggregate([
      { $match: { email: email } },
      { $count: "total" },
    ]);

    // If Exist then Insert OTP in OTP Collection and Send OTP to User Email
    if (UserCount.length > 0) {
      // OTP insert into OTP collection
      await OTPSModel.create({ email: email, otp: OTPCode });

      // Send OTP to user email
      const SendEmail = await SendEmailUtility(
        email, // User Email
        `Your PIN Code is ${OTPCode}.  Please do not share this PIN with anyone.<Inventory Management System Team>`, // Email Body
        "Email Verification OTP for Inventory Management System" // Email Subject
      );
      // Return Success
      return { status: "success", data: SendEmail };
    } else {
      // Return Fail
      return { status: "fail", data: "No User Found" };
    }
  } catch (error) {
    // Return Error
    return { status: "fail", data: error.toString() };
  }
};
// Exporting Module
module.exports = UserVerifyEmailService;
