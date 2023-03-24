import Tasks from "../models/Tasks.js";
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
