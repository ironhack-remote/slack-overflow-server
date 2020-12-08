const Session = require("../models/Session.model");

module.exports = (req, res, next) => {
  if (!req.headers.authorization || req.headers.authorization === "null") {
    return res.status(400).json({ errorMessage: "You are not authenticated" });
  }

  Session.findById(req.headers.authorization)
    .populate("user")
    .then((sessionInfo) => {
      if (!sessionInfo) {
        return res
          .status(400)
          .json({ errorMessage: "You are not authenticated" });
      }

      req.user = sessionInfo.user;
      next();
    });
};
