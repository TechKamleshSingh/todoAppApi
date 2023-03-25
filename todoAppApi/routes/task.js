import express from "express";
import { createTasks, deteteTask, getTasks, myTasks, updateTask } from "../controller/tasks.js";

const router = express.Router();

router.post("/", createTasks);
router.get("/", getTasks);
router.get("/mytasks", myTasks);
router.put("/:taskId", updateTask)
router.delete("/:taskId", deteteTask)

export default router;
