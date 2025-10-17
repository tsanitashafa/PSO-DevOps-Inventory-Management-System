/*--------------------------------------------------------------------------*/
/*                        Delete Parent Childs Service Module               */
/* -------------------------------------------------------------------------*/
const mongoose = require("mongoose");
// Delete Parent Childs Service function
const DeleteParentChildsService = async (
  Request,
  ParentModel,
  ChildsModel,
  JoinPropertyName
) => {
  const session = await mongoose.startSession();
  try {
    // Start Transaction
    session.startTransaction();
    // Parent Creation
    const DeleteID = Request.params.id;
    const UserEmail = Request.headers["email"];
    // Query Object for Childs
    let ChildQueryObject = {};
    ChildQueryObject[JoinPropertyName] = DeleteID;
    ChildQueryObject["UserEmail"] = UserEmail;
    // Query Object for Parent
    let ParentQueryObject = {};
    ParentQueryObject["_id"] = DeleteID;
    ParentQueryObject["UserEmail"] = UserEmail;

    // First Delete Childs then Parent
    const ChildsDelete = await ChildsModel.deleteMany(ChildQueryObject).session(
      session
    );

    // Then Delete Parent
    const ParentDelete = await ParentModel.deleteMany(
      ParentQueryObject
    ).session(session);
    // Commit Transaction
    await session.commitTransaction();
    session.endSession();
    return { status: "success", data: { ParentDelete, ChildsDelete } };
  } catch (error) {
    // Rollback Transaction
    await session.abortTransaction();
    session.endSession();
    return { status: "error", data: error.toString() };
  }
};

module.exports = DeleteParentChildsService;
