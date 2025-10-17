/* -------------------------------------------------------------------------- */
/*                           Purchase Report Service Module                     */
/* -------------------------------------------------------------------------- */

const PurchaseProductModel = require("../../models/Purchases/PurchaseProductsModel");
// Purchase Report Service Function
const PurchaseReportService = async (Request) => {
  try {
    // Extracting User Email and Date Range from Request
    const UserEmail = Request.headers["email"];
    const FromDate = Request.body["FromDate"];
    const ToDate = Request.body["ToDate"];
// Aggregating Purchase Data Based on User Email and Date Range
    const data = await PurchaseProductModel.aggregate([
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

// Exporting the Purchase Report Service Module
module.exports = PurchaseReportService;
