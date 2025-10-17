// Importing Mongoose
const mongoose = require("mongoose");
// Return Data Schema
const DataSchema = mongoose.Schema(
  {
    UserEmail: { type: String },
    CustomerID: { type: mongoose.Schema.Types.ObjectId },
    VatTax: { type: Number },
    Discount: { type: Number },
    OtherCost: { type: Number },
    ShippingCost: { type: Number },
    GrandTotal: { type: Number },
    Note: { type: String },

    CreatedAt: { type: Date, default: Date.now() },
  },
  { versionKey: false }
);
// Creating Returns Model
const ReturnsModel = mongoose.model("returns", DataSchema);
// Exporting Return Model
module.exports = ReturnsModel;
