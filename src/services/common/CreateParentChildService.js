/* -------------------------------------------------------------------------- */
/*                           Create ParentChildren Service Module             */
/* -------------------------------------------------------------------------- */
//
const mongoose = require("mongoose");

// Create ParentChildren Service Function
const CreateParentChildrenService = async (
  Request,
  ParentModel,
  ChildrenModel,
  JoinPropertyName
) => {
  //* Create transaction session
  const session = await mongoose.startSession();
  try {
// * Starting the transaction
  await  session.startTransaction();
    // First Database Process
    const Parent = Request.body["Parent"];
    // Adding User Email to Parent Body
    Parent.UserEmail = Request.headers["email"];
    // Inserting Parent Data into Collection
    const ParentCreation = await ParentModel.create([Parent], { session });

    //* Second Database Process

    // Getting Children from Request Body
    const Childs = Request.body["Childs"];
    // Adding User Email and ParentID to each Child
    await Childs.forEach((element) => {
      element["UserEmail"] = Request.headers["email"];
      element[JoinPropertyName] = ParentCreation[0]["_id"];
    });
    // Inserting Children into Collection
    const ChildrenCreation = await ChildrenModel.insertMany(Childs, {
      session,
    });

// * Committing the transaction
    await session.commitTransaction();
    session.endSession();
return {status: "Success", Parent: ParentCreation, Childs: ChildrenCreation};
  } catch (error) {
   //* Aborting the transaction in case of error
    await session.abortTransaction();
    session.endSession();
    return {status: "fail", error: error.toString() };
  }
};
module.exports = CreateParentChildrenService;
