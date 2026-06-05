/* -------------------------------------------------------------------------- */
/*                             Email Verification module                      */
/* -------------------------------------------------------------------------- */
const SendEmailUtility = require("../../utilities/SendEmailUtility");
const OTPSModel = require("../../models/Users/OTPSModel");

// User Email Verification Service
const UserVerifyEmailService = async (Request, DataModel) => {
  try {
    // Bersihkan email dari URL
    const email = decodeURIComponent(Request.params.email || "")
      .trim()
      .toLowerCase();

    // Validasi kosong
    if (!email) {
      return { status: "fail", data: "Email is required" };
    }

    // Generate Random 6 Digit OTP
    const OTPCode = Math.floor(100000 + Math.random() * 900000);

    // Cek user berdasarkan email, dibuat case-insensitive
    const user = await DataModel.findOne({
      email: { $regex: new RegExp(`^${email}$`, "i") },
    });

    if (!user) {
      return { status: "fail", data: "No User Found" };
    }

    // Simpan OTP
    await OTPSModel.create({
      email: user.email,
      otp: OTPCode,
    });

    // Kirim OTP ke email user
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