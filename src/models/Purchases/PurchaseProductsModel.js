// Importing Mongoose
const mongoose = require("mongoose");
// PurchaseProducts Data Schema
const DataSchema = mongoose.Schema(
  {
    UserEmail: { type: String },
    PurchaseID: { type: mongoose.Schema.Types.ObjectId },
    ProductID: { type: mongoose.Schema.Types.ObjectId },
    Qty: { type: Number },
    UnitCost: { type: Number },
    Total: { type: Number },

    CreatedAt: { type: Date, default: Date.now() },
  },
  { versionKey: false }
);
// Creating PurchaseProducts Model
const PurchaseProductsModel = mongoose.model("purchaseproducts", DataSchema);
// Exporting PurchaseProduct Model
module.exports = PurchaseProductsModel;
