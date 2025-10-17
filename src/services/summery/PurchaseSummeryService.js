/* -------------------------------------------------------------------------- */
/*                           Expense Summery Service Module                     */
/* -------------------------------------------------------------------------- */

const PurchasesModel = require("../../models/Purchases/PurchasesModel");
// Purchase Summery Service Function
const PurchaseSummeryService = async (Request) => {
  try {
    const UserEmail = Request.headers["email"];
    // Aggregating Purchase Data Based on User Email
    const data = await PurchasesModel.aggregate([
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
module.exports = PurchaseSummeryService;
