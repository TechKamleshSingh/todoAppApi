import express from "express";
import "dotenv/config";
// import dotenv from 'dotenv'
// dotenv.config()
import connectDB from "./Databse/conn.js";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import allRoutes from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 8080;

// middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("tiny"));

// Default Route
app.get("/", (req, res) => {
  res.send("Server Running...!!");
});

// Routes
app.use("/api/v1", allRoutes);

// Error handler

app.use((err, req, res) => {
  const status = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(status).json({ message, stack: err.stack });
});

// database connection and server running
connectDB().then(() => {
  try {
    app.listen(PORT, () => {
      console.log(`Server Starts on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
});
