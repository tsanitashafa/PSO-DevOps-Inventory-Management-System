/* -------------------------------------------------------------------------- */
/*                         Return Report Service Module                     */
/* -------------------------------------------------------------------------- */

const ReturnProductModel = require("../../models/Returns/ReturnProductsModel");
// Return Report Service Function
const ReturnReportService = async (Request) => {
  try {
    // Extracting User Email and Date Range from Request
    const UserEmail = Request.headers["email"];
    const FromDate = Request.body["FromDate"];
    const ToDate = Request.body["ToDate"];
// Aggregating Return Data Based on User Email and Date Range
    const data = await ReturnProductModel.aggregate([
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
                TotalAmount: { $sum: "$Total" },
              },
            },
          ],
          Rows: [
            {
              $lookup: {
                from: "products",
                localField: "ProductID",
                foreignField: "_id",
                as: "products",
              },
            },
            {
              $unwind: "$products",
            },
            {
              $lookup: {
                from: "brands",
                localField: "products.BrandID",
                foreignField: "_id",
                as: "brands",
              },
            },
            {
              $lookup: {
                from: "categories",
                localField: "products.CategoryID",
                foreignField: "_id",
                as: "categories",
              },
            },
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
// Exporting the Return Report Service Module
module.exports = ReturnReportService;
