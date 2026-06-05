const UserDetailsService = async (Request, DataModel) => {
  try {
    const email = Request.email;

    const data = await DataModel.find({ email: email });

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

module.exports = UserDetailsService;