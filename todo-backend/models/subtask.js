const mongoose = require('mongoose');

const subtaskSchema = mongoose.Schema({

    taskId:{
        type: String,
        required: true
    },
    subtaskName:{
        type: String,
        required: true
    },
    subtaskDescription:{
        type: String,
        required: true
    },
    subtaskStatus:{
        type: String,
        required: true
    }

});

const Subtask = module.exports = mongoose.model('Subtask',subtaskSchema);

module.exports.getAllSubtask = function(callback){
    Subtask.find({subtaskStatus:{$ne : 'DELETED'}},callback);
}


module.exports.getSubtaskByTaskid = function(taskId,callback){
    Subtask.findOne({taskId:taskId},callback);
}

module.exports.addSubtask = function(newSubtask,callback){
    newSubtask.save(callback);
}

module.exports.updateSubtaskStatus = function(subtaskId,newStatus,callback){
    Subtask.updateOne({_id:subtaskId},{$set:{subtaskStatus:newStatus}},callback);
}

module.exports.updateSubtask = function(subtaskId,query,callback){
    Subtask.updateOne({_id:subtaskId},{$set:query},callback);
}

module.exports.deleteSubtask = function(subtaskId,callback){
    Subtask.deleteOne({_id:subtaskId},callback);
}