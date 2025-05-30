module.exports.paginatePhones = (req, res, next) => {
  const { page = 1, results = 10 } = req.query;

  req.pagination = {
    limit: Number(results),
    offest: (page - 1) * results,
  };
  next();
};
