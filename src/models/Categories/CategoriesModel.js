// Importing Mongoose module
const mongoose = require("mongoose");

// Categories Data Schema
const DataSchema = mongoose.Schema(
  {
    UserEmail: { type: String },
    Name: { type: String, unique: true },
    CreatedAt: { type: Date, default: Date.now() },
  },
  { versionKey: false }
);

// Creating Categories Model
const CategoriesModel = mongoose.model("categories", DataSchema);
// Exporting Categories Model
module.exports = CategoriesModel;
