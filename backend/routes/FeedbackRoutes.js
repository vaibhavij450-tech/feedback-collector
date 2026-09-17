const express = require("express");

const {
  createFeedback,
  getFeedback,
  deleteFeedback,
} = require("../controllers/FeedbackController");

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
 * Handles requests to delete a feedback record by ID.
 */
router.delete("/:id", deleteFeedback);

module.exports = router;