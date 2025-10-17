/*-------------------------------------------------------------------------*/
/*                         Sales Controller Module                     */
/* ------------------------------------------------------------------------*/
// Importing Required Models
const ParentModel = require("../../models/Sales/SalesModel");
const ChildModel = require("../../models/Sales/SaleProductsModel");
// Importing Services
const CreateParentChildsService = require("../../services/common/CreateParentChildService");
const ListOneJoinService = require("../../services/common/ListOneJoinService");
const DeleteParentChildsService = require("../../services/common/DeleteParentChildsService");
const SalesReportService = require("../../services/report/SalesReportService");
const SalesSummeryService = require("../../services/summery/SalesSummeryService");
/* ------------------------------------------------------------------------ */

// Create Sales Controller
exports.CreateSales = async (Request, Response) => {
  const Result = await CreateParentChildsService(
    Request,
    ParentModel,
    ChildModel,
    "SaleID"
  );
  Response.status(200).json(Result);
};

exports.SalesList = async (Request, Response) => {
  // Creating Search Array for Search Query with Regex
  const SearchRgx = { $regex: Request.params.searchKeyword, $options: "i" }; // i for case insensitive
  // Creating Join Stage Object
  const JoinStage = {
    $lookup: {
      from: "customers",
      localField: "CustomerID",
      foreignField: "_id",
      as: "customers",
    },
  };
  // Creating Search Array
  const SearchArray = [
    { Note: SearchRgx },
    { "customers.CustomerName": SearchRgx },
    { "customers.Address": SearchRgx },
    { "customers.Phone": SearchRgx },
    { "customers.Email": SearchRgx },
  ];
  // Calling ListOneJoinService
  const Result = await ListOneJoinService(
    Request,
    ParentModel,
    SearchArray,
    JoinStage
  );
  // Sending Response to Client
  Response.status(200).json(Result);
};
// Sales Delete Controller

exports.SaleDelete = async (Request, Response) => {
  const Result = await DeleteParentChildsService(
    Request,
    ParentModel,
    ChildModel,
    "SaleID"
  );
  Response.status(200).json(Result);
};
// Sale Report Controller
exports.GetSalesReport = async (Request, Response) => {
  const Result = await SalesReportService(Request);
  Response.status(200).json(Result);
};
// Sales Summery Controller
exports.GetSalesSummery = async (Request, Response) => {
  const Result = await SalesSummeryService(Request);
  Response.status(200).json(Result);
};