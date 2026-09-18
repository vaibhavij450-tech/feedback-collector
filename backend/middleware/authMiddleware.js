const jwt = require("jsonwebtoken");

/**
 * Verifies the admin authentication cookie before allowing access
 * to protected routes.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express middleware callback.
 * @returns {void}
 */
const authenticateAdmin = (req, res, next) => {
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

    req.admin = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired authentication",
    });
  }
};

module.exports = authenticateAdmin;