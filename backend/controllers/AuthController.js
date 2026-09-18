const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");

/**
 * Authenticates an admin and creates a JWT authentication cookie.
 *
 * @param {Object} req - Express request object containing admin credentials.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} Sends the authentication result to the client.
 */
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const admin = await Admin.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!admin) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const passwordMatches = await bcrypt.compare(
      password,
      admin.passwordHash
    );

    if (!passwordMatches) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        adminId: admin._id.toString(),
        role: admin.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite:
        process.env.NODE_ENV === "production"
          ? "none"
          : "lax",
      maxAge: 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successful",
    });
  } catch (error) {
    console.error(
      "Admin login failed:",
      error.message
    );

    return res.status(500).json({
      message: "Login failed",
    });
  }
};

/**
 * Verifies whether the current request has a valid
 * administrator authentication cookie.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void} Sends the authentication status.
 */
const checkAdminAuth = (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    if (decoded.role !== "admin") {
      return res.status(403).json({
        message: "Admin access required",
      });
    }

    return res.status(200).json({
      authenticated: true,
    });
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired authentication",
    });
  }
};
/**
 * Logs the administrator out by clearing the authentication cookie.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void} Sends the logout result to the client.
 */
const logoutAdmin = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite:
      process.env.NODE_ENV === "production"
        ? "none"
        : "lax",
  });

  return res.status(200).json({
    message: "Logout successful",
  });
};

module.exports = {
  loginAdmin,
  checkAdminAuth,
  logoutAdmin,
};