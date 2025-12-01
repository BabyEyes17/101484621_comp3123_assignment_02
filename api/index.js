const express = require("express");
const serverless = require("serverless-http");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");

// Import routes from your backend folder
const userRouter = require("../backend/routes/user");
const employeeRouter = require("../backend/routes/employee");

const app = express();

/* Middleware */
app.use(express.json());
app.use(cors());

/* MongoDB Connection */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB Atlas (Vercel)"))
  .catch((err) => console.error("MongoDB error:", err));

/* Static uploads */
app.use("/uploads", express.static(path.join(__dirname, "../backend/uploads")));

/* Routes */
app.use("/api/v1/user", userRouter);
app.use("/api/v1/emp", employeeRouter);

/* Default route */
app.get("/", (req, res) => {
  res.json({ message: "Backend running on Vercel" });
});

/* Export handler for Vercel */
module.exports = serverless(app);
