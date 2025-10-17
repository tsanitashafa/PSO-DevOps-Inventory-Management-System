/* -------------------------------------------------------------------------- */
/*                           Update Service Module                            */
/* -------------------------------------------------------------------------- */

// Update Service Function
const UpdateService = async (Request, DataModel) => {
  try {
    // Getting Data from Request headers
    const UserEmail = Request.headers["email"];
    // Getting Data from Request params
    const id = Request.params.id;
    // Getting Data from Request body
    const PostBody = Request.body;
    // Update Data using id and user email
    const data = await DataModel.updateOne(
      { _id: id, UserEmail: UserEmail },
      PostBody
    );
    // Return Success with query Data
    return { status: "success", data: data };
  } catch (error) {
    // Return Error
    return { status: "fail", data: error.toString() };
  }
};

// Exporting Module
module.exports = UpdateService;
