/*-------------------------------------------------------------------------*/
/*                          Brands Controller Module                       */
/* ------------------------------------------------------------------------*/
const mongoose = require("mongoose");
// Importing Required Models
const DataModel = require("../../models/Brands/BrandsModel");
const ProductsModel = require("../../models/Products/ProductsModel");
// Importing Services
const CreateService = require("../../services/common/CreateService");
const UpdateService = require("../../services/common/UpdateService");
const ListService = require("../../services/common/ListService");
const DropDownService = require("../../services/common/DropDownService");
const CheckAssociateService = require("../../services/common/CheckAssociateService");
const DeleteService = require("../../services/common/DeleteService");

/* ------------------------------------------------------------------------ */
// Create Brand Controller
exports.CreateBrand = async (Request, Response) => {
  const Result = await CreateService(Request, DataModel);
  Response.status(200).json(Result);
};

// Update Brand Controller
exports.UpdateBrand = async (Request, Response) => {
  const Result = await UpdateService(Request, DataModel);
  Response.status(200).json(Result);
};

// Brand List Controller
exports.BrandList = async (Request, Response) => {
  // Creating Search Array for Search Query with Regex
  const SearchRgx = { $regex: Request.params.searchKeyword, $options: "i" }; // i for case insensitive
  const SearchArray = [{ Name: SearchRgx }]; // Searching in Name field only
  // Calling List Service
  const Result = await ListService(Request, DataModel, SearchArray);
  // Returning Response
  Response.status(200).json(Result);
};

// Brand Dropdown Controller
exports.BrandDropDown = async (Request, Response) => {
  const Result = await DropDownService(Request, DataModel, { _id: 1, Name: 1 });
  Response.status(200).json(Result);
};

// Delete Brand Controller
exports.DeleteBrand = async (Request, Response) => {
  // Getting ID from Request Params
  const DeleteID = Request.params.id;
  // Importing mongoose to convert string ID to ObjectId
  const ObjectId = mongoose.Types.ObjectId;

  // Check if the Brand is associated with any products
  const CheckAssociate = await CheckAssociateService(
    { BrandID: new ObjectId(DeleteID) },
    ProductsModel
  );
  // If associated, return associate status
  if (CheckAssociate) {
    Response.status(200).json({
      status: "associate",
      data: "This Brand is associated with other products, so it cannot be deleted.",
    });
  } else {
    // If not associated, proceed to delete
    const Result = await DeleteService(Request, DataModel);
    Response.status(200).json(Result);
  }
};