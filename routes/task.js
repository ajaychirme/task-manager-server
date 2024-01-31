import express from "express";
import {addTask,getAllTasks,deleteTask,updateTask} from "../controllers/task.js";

const router = express.Router();

router.post("/add-task",addTask);
router.post("/get-all-tasks",getAllTasks);
router.post("/update-task", updateTask);
router.delete("/delete-task/:taskId", deleteTask);

//update

//delete

export default router;