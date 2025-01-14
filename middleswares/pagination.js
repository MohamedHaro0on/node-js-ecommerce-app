const paginate = async (req, res, next, Model) => {
  const size = parseInt(req.query.limit) || 5;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(size);
  const skip = (parseInt(page) - 1) * limit;
  const totalCount = await Model.estimatedDocumentCount();
  const totalPages = Math.ceil(totalCount / limit);
  req.pagination = {
    limit,
    skip,
    page,
    totalCount,
    totalPages,
  };
  // delete [req.query.page] && [req.query.limit] after parsing their values ;
  // to make it easier to perform to spread the attributes of the req.query object ;
  if (req.query.page) {
    delete req.query.page;
  }
  if (req.query.limit) {
    delete req.query.limit;
  }
  next();
};

// Custom middleware to apply paginate only to GET requests
const paginateForGetRequests = (req, res, next, Model) => {
  if (req.method === "GET") {
    paginate(req, res, next, Model);
  } else {
    next(); // Skip paginate middleware for non-GET requests
  }
};
// Apply the custom middleware to all routes

export default paginateForGetRequests;
