const jwt = require("jsonwebtoken");
const { User } = require("../Model/user.model");

const protect = async (req, res, next) => {
  try {
    //gets token from header (authorization)
    const token = req.headers.authorization;
    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);
    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    next();
  } catch (err) {
    console.error("Error in auth middleware:", err.message);
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = { protect };
