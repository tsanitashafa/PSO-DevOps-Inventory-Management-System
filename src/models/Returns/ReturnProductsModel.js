// Importing Mongoose
const mongoose = require("mongoose");
// ReturnProducts Data Schema
const DataSchema = mongoose.Schema(
  {
    UserEmail: { type: String },
    ReturnID: { type: mongoose.Schema.Types.ObjectId },
    ProductID: { type: mongoose.Schema.Types.ObjectId },
    Qty: { type: Number },
    UnitCost: { type: Number },
    Total: { type: Number },
    CreatedAt: { type: Date, default: Date.now() },
  },
  { versionKey: false }
);
// Creating ReturnProducts Model
const ReturnProductsModel = mongoose.model("returnproducts", DataSchema);
// Exporting ReturnProduct Model
module.exports = ReturnProductsModel;
