const express = require("express");

const {
  loginAdmin,
  checkAdminAuth,
    logoutAdmin,
} = require("../controllers/AuthController");

const router = express.Router();

/**
 * Handles administrator login requests.
 */
router.post("/login", loginAdmin);

/**
 * Checks whether the current administrator session is valid.
 */
router.get("/check", checkAdminAuth);

/**
 * Logs the administrator out and clears the authentication cookie.
 */
router.post("/logout", logoutAdmin);

module.exports = router;