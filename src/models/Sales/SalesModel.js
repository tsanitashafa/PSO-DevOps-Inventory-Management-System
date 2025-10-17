// Importing Mongoose
const mongoose = require("mongoose");
// Sales Data Schema
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
// Creating Sales Model
const SalesModel = mongoose.model("sales", DataSchema);
// Exporting Sales Model
module.exports = SalesModel;
