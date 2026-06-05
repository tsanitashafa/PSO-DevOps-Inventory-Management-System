/* -------------------------------------------------------------------------- */
/*                             Email Verification module                      */
/* -------------------------------------------------------------------------- */
const SendEmailUtility = require("../../utilities/SendEmailUtility");
const OTPSModel = require("../../models/Users/OTPSModel");

const escapeRegex = (text) => {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

// User Email Verification Service
const UserVerifyEmailService = async (Request, DataModel) => {
  try {
    const email = decodeURIComponent(Request.params.email || "")
      .trim()
      .toLowerCase();

    if (!email) {
      return { status: "fail", data: "Email is required" };
    }

    const OTPCode = Math.floor(100000 + Math.random() * 900000);

    const user = await DataModel.findOne({
      email: {
        $regex: `^${escapeRegex(email)}$`,
        $options: "i",
      },
    });

    if (!user) {
      return { status: "fail", data: "No User Found" };
    }

    await OTPSModel.create({
      email: user.email,
      otp: OTPCode,
    });

    const SendEmail = await SendEmailUtility(
      user.email,
      `Your PIN Code is ${OTPCode}. Please do not share this PIN with anyone. <Inventory Management System Team>`,
      "Email Verification OTP for Inventory Management System"
    );

    return { status: "success", data: SendEmail };
  } catch (error) {
    return { status: "fail", data: error.toString() };
  }
};

module.exports = UserVerifyEmailService;