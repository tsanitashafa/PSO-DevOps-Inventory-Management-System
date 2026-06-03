/* -------------------------------------------------------------------------- */
/*                          User Registration module                          */
/* -------------------------------------------------------------------------- */

const UserCreateService = async (Request, DataModel) => {
  try {
    let reqBody = Request.body;

    reqBody.photo = "none";

    let data = await DataModel.create(reqBody);

    return {
      status: "success",
      data: data,
    };
  } catch (error) {
    return {
      status: "fail",
      data: error.toString(),
    };
  }
};

module.exports = UserCreateService;
