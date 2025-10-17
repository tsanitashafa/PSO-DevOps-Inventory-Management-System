const mongoose = require("mongoose");
// Brands Data Schema
const DataSchema = mongoose.Schema(
  {
    UserEmail: { type: String },
    Name: { type: String, unique: true },
    CreatedAt: { type: Date, default: Date.now() },
  },
  { versionKey: false }
);
const BrandsModel = mongoose.model("brands", DataSchema);

module.exports = BrandsModel;
