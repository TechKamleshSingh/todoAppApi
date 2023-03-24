import express from "express";
import { createTasks, getTasks, myTasks } from "../controller/tasks.js";

const router = express.Router();

router.post('/', createTasks)
router.get('/', getTasks)
router.get('/mytasks', myTasks)

export default router;