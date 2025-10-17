/* -------------------------------------------------------------------------- */
/*                           Expense Summery Service Module                     */
/* -------------------------------------------------------------------------- */

const SalesModel = require("../../models/Sales/SalesModel");
// Return Summery Service Function
const ReturnSummeryService = async (Request) => {
  try {
    const UserEmail = Request.headers["email"];
    // Aggregating Sale Data Based on User Email
    const data = await SalesModel.aggregate([
      {
        $match: {
          UserEmail: UserEmail,
        },
      },
      {
        // faceting the Results into Total and Last30Days
        $facet: {
          Total: [
            {
              $group: {
                _id: 0,
                TotalAmount: { $sum: "$GrandTotal" },
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
                  $sum: "$GrandTotal",
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
module.exports = ReturnSummeryService;
