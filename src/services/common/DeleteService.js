/* -------------------------------------------------------------------------- */
/*                           Delete Service Module                            */
/* -------------------------------------------------------------------------- */

// Delete Service Function
const DeleteService = async (Request, DataModel) => {
  try {
    // Getting ID from Request Params
    const DeleteID = Request.params.id;
    // Getting User Email from Request Headers
    const UserEmail = Request.headers["email"];

    // Creating Query Object
    const QueryObject = {};
    QueryObject._id = DeleteID;
    QueryObject.UserEmail = UserEmail;
    // Deleting Data from Collection
    const Delete = await DataModel.deleteMany(QueryObject);
    // Return Success with Data
    return { status: "success", data: Delete };
  } catch (error) {
    // Return Error
    return { status: "fail", data: error.toString() };
  }
};

module.exports = DeleteService;
