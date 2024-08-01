const userModel = require("../models/user.model");
const { verifyToken } = require("../manager/jwt-token.manager");

const isAuthorized = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const payload = verifyToken(token);

    const user = await userModel.findById(payload.id);

    if (!user) {
      res.status(401).json({ message: "Unauthorized user" });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized .." });
    return;
  }
};

const isAdmin = (req, res, next) => {
  const user = req.user;
  if (user && user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Forbidden" });
    return;
  }
};

module.exports = {
  isAuthorized,
  isAdmin,
};
