// Importing Mongoose
const mongoose = require("mongoose");
// SaleProducts Data Schema
const DataSchema = mongoose.Schema(
  {
    UserEmail: { type: String },
    SaleID: { type: mongoose.Schema.Types.ObjectId },
    ProductID: { type: mongoose.Schema.Types.ObjectId },
    Qty: { type: Number },
    UnitCost: { type: Number },
    Total: { type: Number },

    CreatedAt: { type: Date, default: Date.now() },
  },
  { versionKey: false }
);
// Creating SaleProducts Model
const SaleProductsModel = mongoose.model("saleproducts", DataSchema);
// Exporting SaleProduct Model
module.exports = SaleProductsModel;
