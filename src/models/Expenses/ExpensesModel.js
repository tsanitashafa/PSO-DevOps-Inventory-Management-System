// importing mongoose module
const mongoose = require("mongoose");
// Expenses Data Schema
const DataSchema = mongoose.Schema(
  {
    UserEmail: { type: String },
    TypeID: { type: mongoose.Schema.Types.ObjectId },
    Amount: { type: Number },
    Note: { type: String },
    CreatedAt: { type: Date, default: Date.now() },
  },
  { versionKey: false }
);
// Creating Expenses Model
const ExpensesModel = mongoose.model("expenses", DataSchema);

// Exporting Expenses Model
module.exports = ExpensesModel;
