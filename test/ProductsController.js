/*-------------------------------------------------------------------------*/
/*                          Product Controller Module                      */
/* ------------------------------------------------------------------------*/
const mongoose = require("mongoose");

// Importing Required Models
const DataModel = require("../../models/Products/ProductsModel");
const ReturnProductsModel = require("../../models/Returns/ReturnProductsModel");
const PurchaseProductsModel = require("../../models/Purchases/PurchaseProductsModel");
const SaleProductsModel = require("../../models/Sales/SaleProductsModel");

// Importing Services
const CreateService = require("../../services/common/CreateService");
const UpdateService = require("../../services/common/UpdateService");
const ListTwoJoinService = require("../../services/common/ListTwoJoinService");
const CheckAssociateService = require("../../services/common/CheckAssociateService");
const DeleteService = require("../../services/common/DeleteService");
const DetailsByIDService = require("../../services/common/DetailsByIDService");
const DropDownService = require("../../services/common/DropDownService");
/* ------------------------------------------------------------------------ */

// Create Products Controller
exports.CreateProducts = async (Request, Response) => {
  const Result = await CreateService(Request, DataModel);
  Response.status(200).json(Result);
};

// Update Products Controller
exports.UpdateProducts = async (Request, Response) => {
  const Result = await UpdateService(Request, DataModel);
  Response.status(200).json(Result);
};

// Products Details By ID Controller
exports.ProductsDetailsByID = async (Request, Response) => {
  const Result = await DetailsByIDService(Request, DataModel);
  Response.status(200).json(Result);
};

// List Products Controller
exports.ProductsList = async (Request, Response) => {
  const SearchRgx = { $regex: Request.params.searchKeyword, $options: "i" };

  // Join Stages to join with Brands
  const JoinStage1 = {
    $lookup: {
      from: "brands",
      localField: "BrandID",
      foreignField: "_id",
      as: "brands",
    },
  };

  // Join Stages to join with Categories
  const JoinStage2 = {
    $lookup: {
      from: "categories",
      localField: "CategoryID",
      foreignField: "_id",
      as: "categories",
    },
  };

  // Search Array
  const SearchArray = [
    { Unit: SearchRgx },
    { Details: SearchRgx },
    { Name: SearchRgx },
    { "brands.Name": SearchRgx },
    { "categories.Name": SearchRgx },
  ];

  // Calling List Service
  const Result = await ListTwoJoinService(
    Request,
    DataModel,
    SearchArray,
    JoinStage1,
    JoinStage2
  );

  // Returning Response
  Response.status(200).json(Result);
};

// Delete Products Controller
exports.DeleteProduct = async (Request, Response) => {
  const DeleteID = Request.params.id;
  const ObjectId = mongoose.Types.ObjectId;

  const CheckReturnAssociate = await CheckAssociateService(
    { ProductID: new ObjectId(DeleteID) },
    ReturnProductsModel
  );

  const CheckPurchaseAssociate = await CheckAssociateService(
    { ProductID: new ObjectId(DeleteID) },
    PurchaseProductsModel
  );

  const CheckSalesAssociate = await CheckAssociateService(
    { ProductID: new ObjectId(DeleteID) },
    SaleProductsModel
  );

  if (CheckReturnAssociate) {
    Response.status(200).json({
      status: "associate",
      data: "This Product is associated with Return Product, so it cannot be deleted.",
    });
  } else if (CheckPurchaseAssociate) {
    Response.status(200).json({
      status: "associate",
      data: "This Product is associated with Purchase Product, so it cannot be deleted.",
    });
  } else if (CheckSalesAssociate) {
    Response.status(200).json({
      status: "associate",
      data: "This Product is associated with Sales Product, so it cannot be deleted.",
    });
  } else {
    const Result = await DeleteService(Request, DataModel);
    Response.status(200).json(Result);
  }
};

// Products DropDown Controller
exports.ProductsDropDown = async (req, res) => {
  let Result = await DropDownService(req, DataModel, { _id: 1, Name: 1 });
  res.status(200).json(Result);
};