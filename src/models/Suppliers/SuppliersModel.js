// Importing Mongoose
const mongoose = require("mongoose");
// Suppliers Data Schema
const DataSchema = mongoose.Schema(
  {
    UserEmail: { type: String },
    Name: { type: String },
    Phone: { type: String },
    Email: { type: String },
    Address: { type: String },
    CreatedAt: { type: Date, default: Date.now() },
  },
  { versionKey: false }
);
// Creating Suppliers Model
const SuppliersModel = mongoose.model("suppliers", DataSchema);
// Exporting Suppliers Model
module.exports = SuppliersModel;
