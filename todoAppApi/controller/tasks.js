import Tasks from "../models/Tasks.js";
import createError from "../utils/createError.js";
export const createTasks = async (req, res, next) => {
  try {
    const newTask = new Tasks({
      title: req.body.title,
      user: req.user.id,
      completed: req.body.completed,
    });

    await newTask.save();
    return res.status(201).json({ message: "Task created" });
  } catch (error) {
    return next(error);
  }
};

export const getTasks = async (req, res, next) => {
  try {
    const tasks = await Tasks.find();
    return res.status(200).json(tasks);
  } catch (error) {
    return next(error);
  }
};

export const myTasks = async (req, res, next) => {
  try {
    const myTasks = await Tasks.find({ user: req.user.id });
    return res.status(200).json(myTasks);
  } catch (error) {
    return next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const task = await Tasks.findById(req.params.taskId).exec();
    if (!task)
      return next(createError({ status: 404, message: "No task found" }));
    if (task.user.toString() !== req.user.id)
      return next(createError({ status: 401, message: "it's not your task" }));

    const updatedTask = await Tasks.findByIdAndUpdate(
      req.params.taskId,
      {
        title: req.body.title,
        completed: req.body.completed,
      },
      { new: true }
    );
    return res.status(200).json(updatedTask);
  } catch (error) {
    return next(error);
  }
};

export const deteteTask = async (req, res, next) => {
  try {
    const task = await Tasks.findById(req.params.taskId).exec();
    if (!task)
      return next(createError({ status: 404, message: "No task found" }));

    if (task.user.toString() !== req.user.id)
      return next(createError({ status: 401, message: "It's not your task" }));

    await Tasks.findByIdAndDelete(req.params.taskId);
    return res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    return next(error);
  }
};
