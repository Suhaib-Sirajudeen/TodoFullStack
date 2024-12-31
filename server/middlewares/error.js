const error = (requiredItems) => {
  return (req, res, next) => {
    const err = [];
    requiredItems.forEach((attribute) => {
      if (!(attribute in req.body)) {
        err.push(attribute);
      }
    });
    if (err.length > 0) {
      return res
        .status(404)
        .json(
          `this ${JSON.stringify(
            Object.keys(req.body)
          )} attributes are not acceptable ,required attributes are ${err}`
        );
    }
    next();
  };
};

module.exports = error;
