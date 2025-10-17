/* -------------------------------------------------------------------------- */
/*                           Expense Summery Service Module                     */
/* -------------------------------------------------------------------------- */

const ReturnsModel = require("../../models/Returns/ReturnsModel");

const ReturnSummeryService = async (Request) => {
  try {
    const UserEmail = Request.headers["email"];

    const data = await ReturnsModel.aggregate([
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
