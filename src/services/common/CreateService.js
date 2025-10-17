/* -------------------------------------------------------------------------- */
/*                           Create Service Module                            */
/* -------------------------------------------------------------------------- */

// Create Service Function
const CreateService = async (Request, DataModel) => {
  try {
    // Getting Data from Request body
    const PostBody = Request.body;
    // Adding User Email to Post Body
    PostBody.UserEmail = Request.headers["email"];
    // Inserting Data into Collection
    const data = await DataModel.create(PostBody);
    // Return Success with Data
    return { status: "success", data: data };
  } catch (error) {
    // Return Error
    return { status: "fail", data: error.toString() };
  }
};

module.exports = CreateService;
