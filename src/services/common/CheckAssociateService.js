/* -------------------------------------------------------------------------- */
/*                        Check Associate Service Module                      */
/* -------------------------------------------------------------------------- */

// Delete Service Function
const CheckAssociateService = async (QueryObject, AssociateModel) => {
  try {
    const data = await AssociateModel.aggregate([{ $match: QueryObject }]);

    return data.length > 0;
  } catch (error) {
    // Return Error
    console.error(error);
    return false;
  }
};

module.exports = CheckAssociateService;
