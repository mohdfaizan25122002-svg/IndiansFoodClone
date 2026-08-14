const bcrypt = require("bcrypt");
const validator = require("validator");

const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// ============================
// SIGNUP
// ============================

exports.signup = async (req, res) => {
  try {
    let {
      firstName,
      lastName,
      username,
      name,
      email,
      password,
      phone,
      address,
    } = req.body;

    // Support single 'name' field from frontend
    if (!firstName && name) {
      const nameParts = name.trim().split(" ");
      firstName = nameParts[0];
      lastName = nameParts.slice(1).join(" ");
    }

    // Auto-generate username if not provided
    if (!username) {
      if (email && validator.isEmail(email)) {
        username = email.split("@")[0].toLowerCase().replace(/[^a-z0-9]/g, "");
      } else if (firstName) {
        username = firstName.toLowerCase().replace(/[^a-z0-9]/g, "");
      }
    }

    if (!firstName || !username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const emailExist = await User.findOne({ email });

    if (emailExist) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Check username conflict and make unique if auto-generated
    let usernameExist = await User.findOne({ username });
    if (usernameExist) {
      username = `${username}_${Date.now().toString().slice(-4)}`;
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName: lastName || "",
      username,
      email,
      password: hashPassword,
      phone: phone || "",
      address: address || "",
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: "Account Created Successfully",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================
// LOGIN
// ============================

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================
// PROFILE
// ============================

exports.profile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};