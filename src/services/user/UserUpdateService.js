const UserUpdateService = async (Request, DataModel) => {
  try {
    const email = Request.email;

    const { firstName, lastName, mobile, password, photo } = Request.body;

    const updateData = {
      firstName,
      lastName,
      mobile,
      password,
      photo,
    };

    const data = await DataModel.updateOne(
      { email: email },
      { $set: updateData }
    );

    if (data.matchedCount === 0) {
      return {
        status: "fail",
        data: "User tidak ditemukan, profile gagal diupdate",
      };
    }

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

module.exports = UserUpdateService;