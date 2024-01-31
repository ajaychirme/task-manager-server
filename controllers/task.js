import User from "../models/Users.js";
import mongoose from "mongoose";

export const addTask = async (req, res) => {
  try {
    const { task, username } = req.body;
    const user = await User.findOne({ username: username });
    if (user) {
      const newTask = {
        _id: new mongoose.Types.ObjectId(), // Create a new unique ObjectId
        name: task,
      };
      user.tasks.push(newTask);
      await user.save();
      res
        .status(200)
        .json({ status: true, user, msg: "Task added successfully !!" });
    } else {
      res.status(404).json({ status: false, error: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ status: false, error: err.message });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username: username });
    let tasks = user.tasks;
    res.status(201).json({ status: true, tasks, user });
  } catch (err) {
    res.status(500).json({ status: false, error: "Internal Server Error" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const username = req.query.username;
    const user = await User.findOne({ username: username });
    if (user) {
      user.tasks = user.tasks.filter((task) => task._id.toString() !== taskId);
      await user.save();
      res
        .status(200)
        .json({ status: true, user, msg: "Task deleted successfully !!" });
    } else {
      res.status(404).json({ status: false, error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ status: false, error: "Internal Server Error" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { taskId, updatedTask, username } = req.body;
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(404).json({ status: false, error: "User not found" });
    }

    const taskToUpdate = user.tasks.find(
      (task) => task._id.toString() === taskId
    );

    if (!taskToUpdate) {
      return res.status(404).json({ status: false, error: "Task not found" });
    }

    taskToUpdate.name = updatedTask;
    await user.save();

    res
      .status(200)
      .json({ status: true, user, msg: "Task edited successfully !!" });
  } catch (error) {
    res.status(500).json({ status: false, error: "Internal Server Error" });
  }
};
