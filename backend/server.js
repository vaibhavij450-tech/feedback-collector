const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const connectDatabase = require("./config/database");
const feedbackRoutes = require("./routes/FeedbackRoutes");
const authRoutes = require("./routes/AuthRoutes");

const app = express();

// Enable cross-origin requests from the React frontend.
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5177",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
        "http://127.0.0.1:5177",
        process.env.FRONTEND_URL,
      ].filter(Boolean);

      // Allow local network Vite addresses such as:
      // http://192.168.1.29:5173
      const isLocalNetworkOrigin =
        /^http:\/\/192\.168\.1\.\d{1,3}:5173$/.test(
          origin || ""
        );

      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        isLocalNetworkOrigin
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },

    credentials: true,
  })
);

// Parse incoming JSON request bodies.
app.use(express.json());

// Parse authentication cookies.
app.use(cookieParser());

// Health check.
app.get("/api/health", (req, res) => {
  res.json({
    message: "Feedback Practice API is running",
  });
});

// Feedback routes.
app.use("/api/feedback", feedbackRoutes);

// Authentication routes.
app.use("/api/auth", authRoutes);

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