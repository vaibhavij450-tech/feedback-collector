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
      sameSite:
        process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 365 * 24 * 60 * 60 * 1000,
    });

    const responseFeedback = feedback.toObject();

    // Never send the ownership hash to the frontend.
    delete responseFeedback.ownerTokenHash;

    // The feedback just created belongs to the
    // customer who submitted it.
    responseFeedback.isOwner = true;

    return res.status(201).json(responseFeedback);
  } catch (error) {
    console.error(
      "Failed to create feedback:",
      error.message
    );

    return res.status(500).json({
      message: "Failed to create feedback",
      error: error.message,
    });
  }
};

/**
 * Retrieves all feedback records and identifies
 * which records belong to the current customer.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} Sends the feedback records as the response.
 */
const getFeedback = async (req, res) => {
  try {
    const ownerToken = req.cookies.ownerToken;

    // Hash the owner's cookie so it can be compared
    // with the hash stored in MongoDB.
    const ownerTokenHash = ownerToken
      ? crypto
          .createHash("sha256")
          .update(ownerToken)
          .digest("hex")
      : null;

    // Explicitly include ownerTokenHash because the model
    // hides this field by default.
    const feedback = await Feedback.find()
      .select("+ownerTokenHash")
      .sort({
        createdAt: -1,
      });

    const responseFeedback = feedback.map((item) => {
      const feedbackObject = item.toObject();

      const isOwner =
        Boolean(ownerTokenHash) &&
        Boolean(feedbackObject.ownerTokenHash) &&
        feedbackObject.ownerTokenHash === ownerTokenHash;

      // Never expose the ownership hash to the frontend.
      delete feedbackObject.ownerTokenHash;

      return {
        ...feedbackObject,
        isOwner,
      };
    });

    return res.status(200).json(responseFeedback);
  } catch (error) {
    console.error(
      "Failed to fetch feedback:",
      error.message
    );

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
        message:
          "You are not allowed to edit this feedback",
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
        message:
          "You are not allowed to edit this feedback",
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

    const responseFeedback = feedback.toObject();

    // The requester has successfully edited their own feedback.
    responseFeedback.isOwner = true;

    return res.status(200).json(responseFeedback);
  } catch (error) {
    console.error(
      "Failed to update feedback:",
      error.message
    );

    return res.status(500).json({
      message: "Failed to update feedback",
      error: error.message,
    });
  }
};

/**
 * Deletes a feedback record only when the requester owns it.
 *
 * The customer's HTTP-only owner token is hashed and compared
 * with the ownership hash stored for the feedback record.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} Sends the deletion result as the response.
 */
const deleteOwnFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const ownerToken = req.cookies.ownerToken;

    if (!ownerToken) {
      return res.status(403).json({
        message:
          "You are not allowed to delete this feedback",
      });
    }

    const ownerTokenHash = crypto
      .createHash("sha256")
      .update(ownerToken)
      .digest("hex");

    const feedback = await Feedback.findOneAndDelete({
      _id: id,
      ownerTokenHash,
    });

    if (!feedback) {
      return res.status(403).json({
        message:
          "You are not allowed to delete this feedback",
      });
    }

    return res.status(200).json({
      message: "Feedback deleted successfully",
    });
  } catch (error) {
    console.error(
      "Failed to delete own feedback:",
      error.message
    );

    return res.status(500).json({
      message: "Failed to delete feedback",
      error: error.message,
    });
  }
};

/**
 * Deletes a feedback record using its unique ID.
 *
 * This function is used by authenticated administrators.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} Sends the deletion result as the response.
 */
const deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;

    const feedback =
      await Feedback.findByIdAndDelete(id);

    if (!feedback) {
      return res.status(404).json({
        message: "Feedback not found",
      });
    }

    return res.status(200).json({
      message: "Feedback deleted successfully",
    });
  } catch (error) {
    console.error(
      "Failed to delete feedback:",
      error.message
    );

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
  deleteOwnFeedback,
  deleteFeedback,
};