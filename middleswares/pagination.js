const paginate = (req, res, next) => {
  const size = parseInt(req.query.limit) || 5;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(size);
  const skip = (parseInt(page) - 1) * limit;
  req.pagination = {
    limit,
    skip,
  };
  next();
};

export default paginate;
