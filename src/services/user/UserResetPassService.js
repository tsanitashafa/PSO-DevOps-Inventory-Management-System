const UserResetPassService = async (Request, DataModel) => {
  try {
    const email = Request.body.email?.trim().toLowerCase();
    const password = Request.body.password;

    if (!email || !password) {
      return {
        status: "fail",
        data: "Email and new password are required",
      };
    }

    const user = await DataModel.findOne({
      email: { $regex: `^${email}$`, $options: "i" },
    });

    if (!user) {
      return {
        status: "fail",
        data: "No User Found",
      };
    }

    await DataModel.updateOne(
      { _id: user._id },
      {
        $set: {
          password: password,
        },
      }
    );

    return {
      status: "success",
      data: "Password reset successfully",
    };
  } catch (error) {
    return {
      status: "fail",
      data: error.toString(),
    };
  }
};

module.exports = UserResetPassService;