/*--------------------------------------------------------------------------*/
/*                           List Fetching Module                           */
/* -------------------------------------------------------------------------*/
const ListService = async (Request, DataModel, SearchArray) => {
  try {
    // Current Page Number
    const pageNo = Number(Request.params.pageNo);

    // Rows per Page
    const perPage = Number(Request.params.perPage);

    // Search Value
    const searchValue = Request.params.searchKeyword;

    // User Email from Request headers
    const UserEmail = Request.headers["email"];

    // Calculate the number of rows to skip for pagination based on the current page number and rows per page
    const skipRow = (pageNo - 1) * perPage;

    // Define a variable to hold the query result
    let data;

    // If search value is not "0", then go on to build search query
    if (searchValue !== "0") {
      // Build the search query using $or operator to match any of the fields in SearchArray
      const SearchQuery = { $or: SearchArray };
      data = await DataModel.aggregate([
        // Match User Email
        { $match: { UserEmail: UserEmail } },
        // Match Search Query if any
        { $match: SearchQuery },
        {
          // Facet to get total count and paginated rows
          $facet: {
            // Total count of matching documents
            Total: [{ $count: "count" }],
            Rows: [
              // skip documents already displayed
              { $skip: skipRow },
              // limit documents to perPage to display
              { $limit: perPage },
            ],
          },
        },
      ]);
      // Return Success with data
      return { status: "success", data: data[0] };
    } else {
      data = await DataModel.aggregate([
        // Match User Email
        { $match: { UserEmail: UserEmail } },
        {
          // Facet to get total count and paginated rows
          $facet: {
            // Total count of matching documents
            Total: [{ $count: "count" }],
            // Paginated rows
            Rows: [
              // skip documents already displayed
              { $skip: skipRow },
              // limit documents to perPage to display
              { $limit: perPage },
            ],
          },
        },
      ]);
    }
    // Return Success with data
    return { status: "success", data: data[0] };
  } catch (error) {
    // Return Error
    return { status: "fail", data: error.toString() };
  }
};

module.exports = ListService;
