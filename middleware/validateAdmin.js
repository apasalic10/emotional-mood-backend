const asyncHandler = require("express-async-handler");

const validateAdmin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("User is not authorized");
  }
});

module.exports = validateAdmin;
