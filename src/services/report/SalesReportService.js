/* -------------------------------------------------------------------------- */
/*                          Sale Report Service Module                     */
/* -------------------------------------------------------------------------- */

const SaleProductModel = require("../../models/Sales/SaleProductsModel");
// Sales Report Service Function
const SalesReportService = async (Request) => {
  try {
    // Extracting User Email and Date Range from Request
    const UserEmail = Request.headers["email"];
    const FromDate = Request.body["FromDate"];
    const ToDate = Request.body["ToDate"];
// Aggregating Sales Data Based on User Email and Date Range
    const data = await SaleProductModel.aggregate([
      {
        $match: {
          UserEmail: UserEmail,
          CreatedAt: { $gte: new Date(FromDate), $lte: new Date(ToDate) },
        },
      },
      {
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

// Exporting the Sales Report Service Module
module.exports = SalesReportService;
