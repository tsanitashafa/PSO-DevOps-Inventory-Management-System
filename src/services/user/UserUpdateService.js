/* -------------------------------------------------------------------------- */
/*                       User Update module                                   */
/* -------------------------------------------------------------------------- */
const UserUpdateService = async (Request, DataModel) => {
  try {
    const email = Request.email;
    // Update User Details
    const data = await DataModel.updateOne(
      { email: email },
      { $set: Request.body }
    );
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.toString() };
  }
};
module.exports = UserUpdateService;
