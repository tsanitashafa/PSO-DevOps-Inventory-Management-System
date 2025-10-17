// importing mongoose module
const mongoose = require("mongoose");
// Expense Types Data Schema
const DataSchema = mongoose.Schema(
  {
    UserEmail: { type: String },
    Name: { type: String, unique: true },
    CreatedAt: { type: Date, default: Date.now() },
  },
  { versionKey: false }
);
// Creating Expense Types Model
const ExpenseTypeModel = mongoose.model("expensetypes", DataSchema);

// Exporting Expense Types Model
module.exports = ExpenseTypeModel;
