const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDatabase = require("./config/database");
const feedbackRoutes = require("./routes/FeedbackRoutes");

const app = express();

// Enable cross-origin requests from the React frontend.
app.use(cors());

// Parse incoming JSON request bodies.
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    message: "Feedback Practice API is running",
  });
});

// Mount all feedback-related API routes.
app.use("/api/feedback", feedbackRoutes);

const PORT = process.env.PORT || 5000;

/**
 * Connects to the database and starts the Express server.
 *
 * @returns {Promise<void>} Resolves after the server starts listening.
 */
const startServer = async () => {
  await connectDatabase();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();