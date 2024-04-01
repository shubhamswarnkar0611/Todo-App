const Task = require("../models/TaskM");

exports.fetchAllTask = async (req, res) => {
  const { userId } = req.body;
  try {
    
    if (!userId) return res.status(400).send({error: 'Invalid User'});
    const tasks = await Task.find({ userId });
    console.log(tasks)
    if(tasks.length==0) return res.status(404).send({error: 'Task not found'});
     res.status(201).json(tasks);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.createTask = async (req, res) => {
  const { userId, title, description, dueDate } = req.body;
  console.log(req.body);
  try {
    if (!userId || !title || !description)
      return res.status(400).send({ error: "field are required" });
    const task = await Task.create({ userId, title, description, dueDate });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
exports.updateTask = async (req, res) => {
  try {
    const { userId, title, description, dueDate ,taskId} = req.body;
    const newTask = {};
    if (title) newTask.title = title;
    if (description) newTask.description = description;
    if (dueDate) newTask.dueDate = dueDate;

    const task = await Task.findById(taskId);
    if (!task) return res.status(404).send("Not found.");
    if (task.userId != userId) {
      return res
        .status(403)
        .send("You do not have permission to update this task.");
    }
    await Task.findByIdAndUpdate(taskId, {
      $set: newTask,
    });
    res.status(200).json(newTask);
  } catch (e) {
    res.status(500).send(e.message);
  }
};
exports.deleteTask = async (req, res) => {
  try {
    const { userId , taskId } = req.body;
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).send("Not found.");
    if (task.userId != userId) {
      return res
        .status(403)
        .send("You do not have permission to update this task.");
    }
     await Task.findByIdAndDelete(taskId);
    res.status(201).json({ msg: "Deleted Successfully" });
  } catch (e) {
    res.status(500).send(e.message);
  }
};
