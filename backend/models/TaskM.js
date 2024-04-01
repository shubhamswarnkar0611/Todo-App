const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    title:{
        type:String,
        required:[true,'Please provide a task title'],
    },
    description:{
        type:String,
        required:[true,'Please provide a task description'],
    },
    dueDate:{
        type:String,
        required:[true,'Please provide a task due date'],
    }
})

const Task = mongoose.model("Task",TaskSchema);
module.exports =Task;