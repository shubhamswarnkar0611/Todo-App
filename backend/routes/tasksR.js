const express = require('express');
const taskController = require('../controllers/tasksC')
const router=express.Router();

router.post("/fetch-all-tasks",taskController.fetchAllTask)
router.post("/create-tasks",taskController.createTask)
router.post("/update-tasks",taskController.updateTask)
router.post("/delete-tasks",taskController.deleteTask)

module.exports = router;