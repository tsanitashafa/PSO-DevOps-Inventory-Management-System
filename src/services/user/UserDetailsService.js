/* -------------------------------------------------------------------------- */
/*                       Get User Details module                               */
/* -------------------------------------------------------------------------- */
const UserDetailsService = async (Request, DataModel) => {
  const email = Request.email;

  try {
    const data = await DataModel.aggregate([{ $match: { email: email } }]);
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.toString() };
  }
};

module.exports = UserDetailsService;
