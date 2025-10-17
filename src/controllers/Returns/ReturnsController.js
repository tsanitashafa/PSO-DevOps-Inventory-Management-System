/*-------------------------------------------------------------------------*/
/*                         Returns Controller Module                     */
/* ------------------------------------------------------------------------*/
// Importing Required Models
const ParentModel = require("../../models/Returns/ReturnsModel");
const ChildModel = require("../../models/Returns/ReturnProductsModel");
// Importing Services
const CreateParentChildsService = require("../../services/common/CreateParentChildService");
const ListOneJoinService = require("../../services/common/ListOneJoinService");
const DeleteParentChildsService = require("../../services/common/DeleteParentChildsService");
const PurchaseReportService = require("../../services/report/PurchaseReportService");
const ReturnSummeryService = require("../../services/summery/ReturnSummeryService");
/* ------------------------------------------------------------------------ */

// Create Returns Controller
exports.CreateReturns = async (Request, Response) => {
  const Result = await CreateParentChildsService(
    Request,
    ParentModel,
    ChildModel,
    "ReturnID"
  );
  Response.status(200).json(Result);
};

exports.ReturnsList = async (Request, Response) => {
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

// Return Delete Controller
exports.ReturnDelete = async (Request, Response) => {
  const Result = await DeleteParentChildsService(
    Request,
    ParentModel,
    ChildModel,
    "ReturnID"
  );
  Response.status(200).json(Result);
};

// Return Report Controller
exports.GetReturnReport = async (Request, Response) => {
  const Result = await PurchaseReportService(Request);
  Response.status(200).json(Result);
};
// Return Summery Controller
exports.GetReturnSummery = async (Request, Response) => {
  const Result = await ReturnSummeryService(Request);
  Response.status(200).json(Result);
};