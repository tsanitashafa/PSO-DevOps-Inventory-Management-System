// importing mongoose module
const mongoose = require("mongoose");
// OTPs Data Schema
const OTPSchema = mongoose.Schema(
  {
    email: { type: String },
    otp: { type: String },
    status: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now(), expires: 300 }, // OTP Expires after 5 minutes
  },
  { versionKey: false }
);
// Creating OTPS Model

const OTPSModel = mongoose.model("otps", OTPSchema);
// Exporting OTPS Model
module.exports = OTPSModel;
