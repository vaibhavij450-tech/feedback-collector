const mongoose = require("mongoose");

/**
 * Defines the structure and validation rules for feedback records.
 */
const feedbackSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    ownerTokenHash: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Feedback",
  feedbackSchema
);