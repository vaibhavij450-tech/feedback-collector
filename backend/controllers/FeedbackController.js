const crypto = require("crypto");
const Feedback = require("../models/Feedback");

/**
 * Creates a new feedback record and assigns a private owner token.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} Sends the created feedback as the response.
 */
const createFeedback = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Generate a random token that identifies the feedback owner.
    const ownerToken = crypto.randomBytes(32).toString("hex");

    // Store only the hash in MongoDB.
    const ownerTokenHash = crypto
      .createHash("sha256")
      .update(ownerToken)
      .digest("hex");

    const feedback = await Feedback.create({
      name,
      email,
      message,
      ownerTokenHash,
    });

    // Store the raw token in an HTTP-only cookie.
    res.cookie("ownerToken", ownerToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 365 * 24 * 60 * 60 * 1000,
    });

    const responseFeedback = feedback.toObject();

    // Never send the ownership hash to the frontend.
    delete responseFeedback.ownerTokenHash;

    return res.status(201).json(responseFeedback);
  } catch (error) {
    console.error("Failed to create feedback:", error.message);

    return res.status(500).json({
      message: "Failed to create feedback",
      error: error.message,
    });
  }
};

/**
 * Retrieves all feedback records.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} Sends the feedback records as the response.
 */
const getFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find()
      .select("-ownerTokenHash")
      .sort({
        createdAt: -1,
      });

    return res.status(200).json(feedback);
  } catch (error) {
    console.error("Failed to fetch feedback:", error.message);

    return res.status(500).json({
      message: "Failed to fetch feedback",
      error: error.message,
    });
  }
};

/**
 * Updates feedback only when the requester owns the feedback record.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} Sends the updated feedback as the response.
 */
const updateFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, message } = req.body;
    const ownerToken = req.cookies.ownerToken;

    if (!ownerToken) {
      return res.status(403).json({
        message: "You are not allowed to edit this feedback",
      });
    }

    const ownerTokenHash = crypto
      .createHash("sha256")
      .update(ownerToken)
      .digest("hex");

    const feedback = await Feedback.findOne({
      _id: id,
      ownerTokenHash,
    }).select("-ownerTokenHash");

    if (!feedback) {
      return res.status(403).json({
        message: "You are not allowed to edit this feedback",
      });
    }

    if (!name || !email || !message) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    feedback.name = name;
    feedback.email = email;
    feedback.message = message;

    await feedback.save();

    return res.status(200).json(feedback);
  } catch (error) {
    console.error("Failed to update feedback:", error.message);

    return res.status(500).json({
      message: "Failed to update feedback",
      error: error.message,
    });
  }
};

/**
 * Deletes a feedback record using its unique ID.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} Sends the deletion result as the response.
 */
const deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;

    const feedback = await Feedback.findByIdAndDelete(id);

    if (!feedback) {
      return res.status(404).json({
        message: "Feedback not found",
      });
    }

    return res.status(200).json({
      message: "Feedback deleted successfully",
    });
  } catch (error) {
    console.error("Failed to delete feedback:", error.message);

    return res.status(500).json({
      message: "Failed to delete feedback",
      error: error.message,
    });
  }
};

module.exports = {
  createFeedback,
  getFeedback,
  updateFeedback,
  deleteFeedback,
};