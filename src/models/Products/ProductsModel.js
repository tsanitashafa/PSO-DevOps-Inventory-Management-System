// importing mongoose module
const mongoose = require("mongoose");
// Products Data Schema
const DataSchema = mongoose.Schema(
  {
    UserEmail: { type: String },
    BrandID: { type: mongoose.Schema.Types.ObjectId },
    CategoryID: { type: mongoose.Schema.Types.ObjectId },
    Name: { type: String },
    Unit: { type: String },
    Details: { type: String },
    CreatedAt: { type: Date, default: Date.now() },
  },
  { versionKey: false }
);
// Creating Products Model
const ProductsModel = mongoose.model("products", DataSchema);

// Exporting Products Model
module.exports = ProductsModel;
