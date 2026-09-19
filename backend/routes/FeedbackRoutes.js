const express = require("express");

const {
  createFeedback,
  getFeedback,
  updateFeedback,
  deleteOwnFeedback,
  deleteFeedback,
} = require("../controllers/FeedbackController");

const authenticateAdmin = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * Handles feedback creation requests.
 */
router.post("/", createFeedback);

/**
 * Handles requests to retrieve all feedback records.
 */
router.get("/", getFeedback);

/**
 * Handles requests to update feedback.
 * Only the owner of the feedback can edit it.
 */
router.put("/:id", updateFeedback);

/**
 * Handles requests to delete feedback.
 * Only the owner of the feedback can delete it.
 */
router.delete("/own/:id", deleteOwnFeedback);

/**
 * Handles requests to delete a feedback record by ID.
 * Requires authenticated admin access.
 */
router.delete("/:id", authenticateAdmin, deleteFeedback);

module.exports = router;