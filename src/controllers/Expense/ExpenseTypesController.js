/*-------------------------------------------------------------------------*/
/*                          ExpenseType Controller Module                       */
/* ------------------------------------------------------------------------*/
const mongoose = require("mongoose");
// Importing Required Models
const DataModel = require("../../models/Expenses/ExpenseTypesModel");
const ExpensesModel = require("../../models/Expenses/ExpensesModel");
// Importing Services
const CreateService = require("../../services/common/CreateService");
const UpdateService = require("../../services/common/UpdateService");
const ListService = require("../../services/common/ListService");
const DropDownService = require("../../services/common/DropDownService");
const CheckAssociateService = require("../../services/common/CheckAssociateService");
const DeleteService = require("../../services/common/DeleteService");
const DetailsByIDService = require("../../services/common/DetailsByIDService");
/* ------------------------------------------------------------------------ */
// Create ExpenseType Controller
exports.CreateExpenseTypes = async (Request, Response) => {
  const Result = await CreateService(Request, DataModel);
  Response.status(200).json(Result);
};

// Update ExpenseTypes Controller
exports.UpdateExpenseTypes = async (Request, Response) => {
  const Result = await UpdateService(Request, DataModel);
  Response.status(200).json(Result);
};

// ExpenseTypes List Controller
exports.ExpenseTypesList = async (Request, Response) => {
  // Creating Search Array for Search Query with Regex
  const SearchRgx = { $regex: Request.params.searchKeyword, $options: "i" }; // i for case insensitive
  const SearchArray = [{ Name: SearchRgx }]; // Searching in Name field only
  // Calling List Service
  const Result = await ListService(Request, DataModel, SearchArray);
  // Returning Response
  Response.status(200).json(Result);
};

// ExpenseTypes Dropdown Controller
exports.ExpenseTypesDropDown = async (Request, Response) => {
  const Result = await DropDownService(Request, DataModel, { _id: 1, Name: 1 });
  Response.status(200).json(Result);
};
// ExpenseTypes Details By ID Controller
exports.ExpenseTypesDetailsByID = async (Request, Response) => {
  const Result = await DetailsByIDService(Request, DataModel);
  Response.status(200).json(Result);
};

// Delete ExpenseTypes Controller
exports.DeleteExpenseType = async (Request, Response) => {
  // Getting ID from Request Params
  const DeleteID = Request.params.id;
  // Importing mongoose to convert string ID to ObjectId
  const ObjectId = mongoose.Types.ObjectId;

  // Check if the ExpenseType is associated with any Expenses
  const CheckAssociate = await CheckAssociateService(
    {
      TypeID: ObjectId(DeleteID),
    },
    ExpensesModel
  );
  // If associated, return associate status
  if (CheckAssociate) {
    Response.status(200).json({
      status: "associate",
      data: "This ExpenseType is associated with other Expenses, so it cannot be deleted.",
    });
  } else {
    // If not associated, proceed to delete
    const Result = await DeleteService(Request, DataModel);
    Response.status(200).json(Result);
  }
};