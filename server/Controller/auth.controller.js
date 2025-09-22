const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  User,
  validateRegister,
  validateLogin,
} = require("../Model/user.model");

// Register POST: /api/auth/register
exports.register = async (req, res) => {
  try {
    //validating using joi
    const { error } = validateRegister(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const { name, email, password } = req.body;

    //Check user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User exists" });

    //password hashing
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create new user
    const user = await User.create({ name, email, password: hashedPassword });

    res
      .status(201)
      .json({ message: "User Registered successfully", userId: user._id });
  } catch (err) {
    console.error("Error in register controller:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Login POST: /api/auth/login
exports.login = async (req, res) => {
  try {
    //validating using joi
    const { error } = validateLogin(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const { email, password } = req.body;

    //Find user if present
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    //compare password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    //Generated jwt token copy it and store in header (authorization:here)
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("Error in login controller:", err);
    res.status(500).json({ message: "Server error" });
  }
};
