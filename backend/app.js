const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const profileRoutes = require("./routes/profileRoutes");

app.use(express.json());
app.use(cors());

const mongoUrl = process.env.MONGODB_URL;
if (!mongoUrl) {
  console.error("ERROR: MONGODB_URL environment variable is not set!");
  console.error("Please set MONGODB_URL before starting the app.");
  process.exit(1);
}

mongoose.connect(mongoUrl, err => {
  if (err) {
    console.error("MongoDB connection error:", err.message);
    throw err;
  }
  console.log("Mongodb connected...");
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/profile", profileRoutes);

if (process.env.NODE_ENV === "production") {
  const fs = require("fs");
  const buildPath = path.resolve(__dirname, "../frontend/build");
  if (fs.existsSync(buildPath)) {
    app.use(express.static(buildPath));
    app.get("*", (req, res) => res.sendFile(path.resolve(buildPath, "index.html")));
  } else {
    console.warn("Frontend build not found at", buildPath);
    app.get("*", (req, res) => res.json({ msg: "Backend API running. Frontend build not available." }));
  }
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Backend is running on port ${port}`);
});
