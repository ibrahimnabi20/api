/**
 * Server Configuration for Subscription Management API
 *
 * @requires express - Node.js web framework
 * @requires mongoose - MongoDB ODM
 * @requires dotenv - Loads environment variables from .env file
 * @requires cors - Enables Cross-Origin Resource Sharing
 * @requires path - Provides utilities for file and directory paths
 */

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// -Middleware 
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

//  -MongoDB Connection 
/**
 * Establishes a connection to MongoDB using Mongoose.
 * Connection string is retrieved from the .env file.
 */
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(" Connected to MongoDB"))
  .catch((err) => console.error(" MongoDB connection error:", err));

//  -Routes 
/**
 * Import routes for handling API endpoints.
 */
const userRoutes = require("./routes/user");
const subscriptionRoutes = require("./routes/subscriptions");

// Register API routes
app.use("/api/users", userRoutes); // User-related routes (register, login, fetch)
app.use("/api/subscriptions", subscriptionRoutes); // Subscription-related routes (CRUD)

//  -Serve Static Files 
/**
 * Serve static files for the frontend from the "public" directory.
 */
app.use(express.static(path.join(__dirname, "public")));

// -Root Route 
/**
 * Base API route to verify the server is running.
 *
 * @route GET /
 * @returns {String} Welcome message
 */
app.get("/", (req, res) => {
  res.send("Welcome to the Subscription Management API!");
});

//  -Start Server 
/**
 * Starts the server on the specified port.
 * The port is retrieved from the environment variable PORT or defaults to 5000.
 */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
