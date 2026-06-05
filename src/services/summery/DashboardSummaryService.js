const SalesModel = require("../../models/Sales/SalesModel");
const PurchasesModel = require("../../models/Purchases/PurchasesModel");
const ExpensesModel = require("../../models/Expenses/ExpensesModel");
const SaleProductsModel = require("../../models/Sales/SaleProductsModel");

const DashboardSummaryService = async (Request) => {
  try {
    const UserEmail = Request.headers["email"];

    const topCustomer = await SalesModel.aggregate([
      {
        $match: {
          UserEmail: UserEmail,
        },
      },
      {
        $group: {
          _id: "$CustomerID",
          totalAmount: { $sum: "$GrandTotal" },
          totalTransaction: { $sum: 1 },
        },
      },
      {
        $sort: {
          totalAmount: -1,
        },
      },
      {
        $limit: 1,
      },
      {
        $lookup: {
          from: "customers",
          localField: "_id",
          foreignField: "_id",
          as: "customer",
        },
      },
      {
        $unwind: {
          path: "$customer",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 0,
          name: "$customer.CustomerName",
          totalAmount: 1,
          totalTransaction: 1,
        },
      },
    ]);

    const topSupplier = await PurchasesModel.aggregate([
      {
        $match: {
          UserEmail: UserEmail,
        },
      },
      {
        $group: {
          _id: "$SupplierID",
          totalAmount: { $sum: "$GrandTotal" },
          totalTransaction: { $sum: 1 },
        },
      },
      {
        $sort: {
          totalAmount: -1,
        },
      },
      {
        $limit: 1,
      },
      {
        $lookup: {
          from: "suppliers",
          localField: "_id",
          foreignField: "_id",
          as: "supplier",
        },
      },
      {
        $unwind: {
          path: "$supplier",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 0,
          name: "$supplier.Name",
          totalAmount: 1,
          totalTransaction: 1,
        },
      },
    ]);

    const topExpense = await ExpensesModel.aggregate([
      {
        $match: {
          UserEmail: UserEmail,
        },
      },
      {
        $group: {
          _id: "$TypeID",
          totalAmount: { $sum: "$Amount" },
          totalTransaction: { $sum: 1 },
        },
      },
      {
        $sort: {
          totalAmount: -1,
        },
      },
      {
        $limit: 1,
      },
      {
        $lookup: {
          from: "expensetypes",
          localField: "_id",
          foreignField: "_id",
          as: "expenseType",
        },
      },
      {
        $unwind: {
          path: "$expenseType",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 0,
          name: "$expenseType.Name",
          totalAmount: 1,
          totalTransaction: 1,
        },
      },
    ]);

    const bestProduct = await SaleProductsModel.aggregate([
      {
        $match: {
          UserEmail: UserEmail,
        },
      },
      {
        $group: {
          _id: "$ProductID",
          totalQty: { $sum: "$Qty" },
          totalAmount: { $sum: "$Total" },
        },
      },
      {
        $sort: {
          totalQty: -1,
        },
      },
      {
        $limit: 1,
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: {
          path: "$product",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 0,
          name: "$product.Name",
          totalQty: 1,
          totalAmount: 1,
        },
      },
    ]);

    return {
      status: "Success",
      data: {
        topCustomer: topCustomer[0] || null,
        topSupplier: topSupplier[0] || null,
        topExpense: topExpense[0] || null,
        bestProduct: bestProduct[0] || null,
      },
    };
  } catch (error) {
    return {
      status: "fail",
      error: error.toString(),
    };
  }
};

module.exports = DashboardSummaryService;