/*-------------------------------------------------------------------------*/
/*                          Customers Controller Module                       */
/* ------------------------------------------------------------------------*/
const mongoose = require("mongoose");
// Importing Required Models
const DataModel = require("../../models/Customers/CustomersModel");
const SalesModel = require("../../models/Sales/SalesModel");
// Importing Services
const CreateService = require("../../services/common/CreateService");
const UpdateService = require("../../services/common/UpdateService");
const ListService = require("../../services/common/ListService");
const DropDownService = require("../../services/common/DropDownService");
const CheckAssociateService = require("../../services/common/CheckAssociateService");
const DeleteService = require("../../services/common/DeleteService");
/* ------------------------------------------------------------------------ */
// Create Customers Controller
exports.CreateCustomers = async (Request, Response) => {
  const Result = await CreateService(Request, DataModel);
  Response.status(200).json(Result);
};

// Update Customers Controller
exports.UpdateCustomers = async (Request, Response) => {
  const Result = await UpdateService(Request, DataModel);
  Response.status(200).json(Result);
};

// Customers List Controller
exports.CustomersList = async (Request, Response) => {
  // Creating Search Array for Search Query with Regex
  const SearchRgx = { $regex: Request.params.searchKeyword, $options: "i" }; // i for case insensitive
  const SearchArray = [
    // Searching within multiple fields
    { CustomerName: SearchRgx }, // chore: Change from CustomerName to Name for consistency after finished
    { Phone: SearchRgx },
    {
      Email: SearchRgx,
    },
    { Address: SearchRgx },
  ];
  // Calling List Service
  const Result = await ListService(Request, DataModel, SearchArray);
  // Returning Response
  Response.status(200).json(Result);
};

// Customers Dropdown Controller
exports.CustomersDropDown = async (Request, Response) => {
  const Result = await DropDownService(Request, DataModel, {
    _id: 1,
    CustomerName: 1,
  });
  Response.status(200).json(Result);
};

// Delete Customer Controller
exports.DeleteCustomer = async (Request, Response) => {
  // Getting ID from Request Params
  const DeleteID = Request.params.id;
  // Importing mongoose to convert string ID to ObjectId
  const ObjectId = mongoose.Types.ObjectId;

  // Check if the Customer is associated with any products
  const CheckAssociate = await CheckAssociateService(
    { CustomerID: new ObjectId(DeleteID) },
    SalesModel
  );
  // If associated, return associate status
  if (CheckAssociate) {
    Response.status(200).json({
      status: "associate",
      data: "This Customer is associated with Sales, so it cannot be deleted.",
    });
  } else {
    // If not associated, proceed to delete
    const Result = await DeleteService(Request, DataModel);
    Response.status(200).json(Result);
  }
};