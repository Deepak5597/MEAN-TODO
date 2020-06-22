const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({ 
    taskName: {
        type: String,
        required: true
    },
    taskDescription: {
        type: String
    }
});

const Task = mongoose.model('Task',taskSchema);

module.exports = Task;

module.exports.getAllTasks = function(callback){
    Task.find(callback);
}

module.exports.getTaskById = function(taskId,callback){
    Task.findById(taskId,callback);
}

module.exports.addNewTask = function(newTask,callback){
    newTask.save(newTask,callback);
}

module.exports.deleteTask = function(taskId,callback){
    Task.deleteOne(taskId,callback);
}



