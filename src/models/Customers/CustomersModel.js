// Importing Mongoose
const mongoose = require("mongoose");
// Customers Data Schema
const DataSchema = mongoose.Schema(
  {
    UserEmail: { type: String },
    CustomerName: { type: String },
    Phone: { type: String, unique: true },
    Address: { type: String },
    CreatedAt: { type: Date, default: Date.now() },
  },
  { versionKey: false }
);
// Creating Customers Model
const CustomersModel = mongoose.model("customers", DataSchema);
// Exporting Customers Model
module.exports = CustomersModel;
