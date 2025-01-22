const jwt = require("jsonwebtoken");
const User = require("../models/User");

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    // Convert the user document to a plain object and remove the password
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;
    res.status(201).json({
      message: "User registered successfully",
      user: userWithoutPassword,
      status: "success",
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // Exclude password from the result
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    // Convert the user document to a plain object and remove the password
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    res.status(200).json({ token, user: userWithoutPassword });
  } catch (err) {
    next(err);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", id: req.user.id });
    }
    // Convert the user document to a plain object and remove the password
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;
    res.status(200).json({ user: userWithoutPassword });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login, getProfile };
