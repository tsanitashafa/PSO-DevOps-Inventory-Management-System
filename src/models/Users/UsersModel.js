// importing mongoose module
const mongoose = require("mongoose");

// Users Data Schema
const DataSchema = mongoose.Schema(
  {
    email: { type: String, unique: true },
    firstName: { type: String },
    lastName: { type: String },
    mobile: { type: String },
    photo: { type: String },
    password: { type: String },
    createdAt: { type: Date, default: Date.now() },
  },
  { versionKey: false }
);
// Creating Users Model
const DataModel = mongoose.model("users", DataSchema);
// Exporting Users Model
module.exports = DataModel;
