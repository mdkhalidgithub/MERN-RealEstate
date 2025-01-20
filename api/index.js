import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"; // Import cors
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDB Connected successfully!");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

// Enable CORS
app.use(cors({
  origin: "http://localhost:5173", // Replace with your frontend's origin
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific HTTP methods
  credentials: true, // If using cookies
}));

app.use(express.json());

app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});

// API routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

// Middleware for error handling
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
