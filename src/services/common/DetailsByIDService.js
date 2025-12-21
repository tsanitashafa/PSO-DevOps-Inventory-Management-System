/* -------------------------------------------------------------------------- */
/*                 Details By ID Service Module                            */
/* -------------------------------------------------------------------------- */

const mongoose = require("mongoose");

// Create Service Function
const DetailsByIDService = async (Request, DataModel) => {
  try {
    const DetailsID = Request.params.id;
    const UserEmail = Request.headers["email"];
    // Validate DetailsID as a valid MongoDB ObjectId
    const ObjectID = mongoose.Types.ObjectId;
    let QueryObject = {};
    QueryObject["_id"] = new ObjectID(DetailsID);
    QueryObject["UserEmail"] = UserEmail;
    // Fetching Data from Collection
    const data = await DataModel.aggregate([{ $match: QueryObject }]);
    // Return Success with Data
    return { status: "success", data: data };
  } catch (error) {
    // Return Error
    return { status: "fail", data: error.toString() };
  }
};

module.exports = DetailsByIDService;
