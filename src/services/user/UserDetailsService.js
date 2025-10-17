/* -------------------------------------------------------------------------- */
/*                       Get User Details module                               */
/* -------------------------------------------------------------------------- */
const UserDetailsService = async (Request, DataModel) => {
  const email = Request.headers["email"];
  try {
    // Fetch User Details
    const data = await DataModel.aggregate([{ $match: { email: email } }]);
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.toString() };
  }
};
module.exports = UserDetailsService;
