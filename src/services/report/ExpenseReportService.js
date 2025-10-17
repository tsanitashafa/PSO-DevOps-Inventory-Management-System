/* -------------------------------------------------------------------------- */
/*                           Expense Report Service Module                     */
/* -------------------------------------------------------------------------- */
// 
const ExpenseModel = require("../../models/Expenses/ExpensesModel");
// Expense Report Service Function
const ExpenseReportService = async (Request) => {
  try {
    // Extracting User Email and Date Range from Request
    const UserEmail = Request.headers["email"];
    const FromDate = Request.body["FromDate"];
    const ToDate = Request.body["ToDate"];
// Aggregating Expense Data Based on User Email and Date Range
    const data = await ExpenseModel.aggregate([
      {
        $match: {
          UserEmail: UserEmail,
          CreatedAt: { $gte: new Date(FromDate), $lte: new Date(ToDate) },
        },
      },
      {
        // Faceting the Results into Total and Detailed Rows
        $facet: {
          Total: [
            {
              $group: {
                _id: 0,
                TotalAmount: { $sum: "$Amount" },
              },
            },
          ],
          Rows: [
            {
              $lookup: {
                from: "expensetypes",
                localField: "TypeID",
                foreignField: "_id",
                as: "Type",
              },
            },
          ],
        },
      },
    ]);
    // Returning the Aggregated Data with Status
    return { status: "Success", data: data,  };
  } catch (error) {
    // Handling Errors and Returning Failure Status
    return { status: "fail", error: error.toString() };
  }
};

// Exporting the Expense Report Service Module
module.exports = ExpenseReportService;
