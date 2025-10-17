/* -------------------------------------------------------------------------- */
/*                           Expense Summery Service Module                     */
/* -------------------------------------------------------------------------- */

const ExpensesModel = require("../../models/Expenses/ExpensesModel");
// Expense Summery Service Function
const ExpenseSummeryService = async (Request) => {
  try {
    const UserEmail = Request.headers["email"];
    // Aggregating Expense Data Based on User Email
    const data = await ExpensesModel.aggregate([
      {
        $match: {
          UserEmail: UserEmail,
        },
      },
      {
        $facet: {
          Total: [
            {
              $group: {
                _id: 0,
                TotalAmount: { $sum: "$Amount" },
              },
            },
          ],
          // getting last 30 days data
          Last30Days: [
            {
              $group: {
                _id: {
                  $dateToString: { format: "%Y-%m-%d", date: "$CreatedAt" },
                },
                TotalAmount: {
                  $sum: "$Amount",
                },
              },
            },
            { $sort: { _id: -1 } },
            { $limit: 30 },
          ],
        },
      },
    ]);
    // Returning the Aggregated Data with Status
    return { status: "Success", data: data };
  } catch (error) {
    // Handling Errors and Returning Failure Status
    return { status: "fail", error: error.toString() };
  }
};
// Exporting the Expense Summery Service Module
module.exports = ExpenseSummeryService;
