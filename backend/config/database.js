const mongoose = require("mongoose");
const dns = require("dns");

// Use public DNS servers to avoid DNS resolution issues with MongoDB Atlas.
dns.setServers(["8.8.8.8", "8.8.4.4"]);

/**
 * Connects the application to the MongoDB database.
 *
 * @returns {Promise<void>} Resolves when the database connection succeeds.
 */
const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });

    console.log("MongoDB connected successfully");
    console.log("MongoDB connection state:", mongoose.connection.readyState);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

mongoose.connection.on("reconnected", () => {
  console.log("MongoDB reconnected");
});

mongoose.connection.on("error", (error) => {
  console.error("MongoDB error:", error.message);
});

module.exports = connectDatabase;