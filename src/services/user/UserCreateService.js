/* -------------------------------------------------------------------------- */
/*                          User Registration module                          */
/* -------------------------------------------------------------------------- */

const UserCreateService = async (Request, DataModel) => {
  try {
    // Getting Data from Request
    const Postbody = Request.body;
    // Insert Data into User Collection
    const data = await DataModel.create(Postbody);
    // Return Success
    return { status: "success", data: data };
  } catch (error) {
    // Return Error
    return { status: "fail", data: error.toString() };
  }
};
// Exporting Module
module.exports = UserCreateService;
