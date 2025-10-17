/*-------------------------------------------------------------------------*/
/*                           DropDown Data Fetching module                 */
/* ----------------------------------------------------------------------- */

const DropDownService = async (Request, DataModel, Projection) => {
  try {
    // Getting User email from Request headers
    const UserEmail = Request.headers["email"];
    // Fetch DropDown Data with Projection
    const data = await DataModel.aggregate([
      // Match User Email
      { $match: { UserEmail: UserEmail } },
      // Project Required Fields
      { $project: Projection },
    ]);
    // Return Success with Data
    return { status: "success", data: data };
  } catch (error) {
    // Return Error
    return { status: "fail", data: error.toString() };
  }
};
module.exports = DropDownService;
