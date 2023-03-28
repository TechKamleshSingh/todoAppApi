import express from "express";
import taskRoutes from "./task.js";
import authRoutes from "./auth.js";
import userRoutes from "./user.js";
import checkAuth from "../utils/checkAuth.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", checkAuth, userRoutes);
router.use("/task", checkAuth, taskRoutes);

export default router;
