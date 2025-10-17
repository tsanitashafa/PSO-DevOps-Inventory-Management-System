// Importing Mongoose
const mongoose = require("mongoose");
// Purchases Data Schema
const DataSchema = mongoose.Schema(
  {
    UserEmail: { type: String },
    SupplierID: { type: mongoose.Schema.Types.ObjectId },
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
// Creating Purchases Model
const PurchasesModel = mongoose.model("purchases", DataSchema);
// Exporting Purchases Model
module.exports = PurchasesModel;
