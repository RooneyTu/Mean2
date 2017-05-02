const mongoose = require('mongoose');
const config = require('../config/database');

// Task Schema
const TaskSchema = mongoose.Schema({
    title:{
        type: String,
        require: true
    },
    isDone: {
        type: Boolean,
    },
    userId: {
        type: String
    }
})

const Task = module.exports = mongoose.model('Task', TaskSchema);


module.exports.getTasks = function(user, callback){
    console.log(user._id);
    const query = {userId: user._id}
    Task.find(callback);
}

module.exports.getTaskById = function(user, id, callback){
    const query = {_id: mongoose.Types.ObjectId(id), userId: user._id}
    Task.findOne(query, callback);
}

module.exports.deleteTaskById = function(user, id, callback){
    const query = {_id: mongoose.Types.ObjectId(id), userId: user._id}
    Task.remove(query, callback);
}

module.exports.updateTaskById = function(user, id, updTask, callback){
   const query = {_id: mongoose.Types.ObjectId(id), userId: user._id}
    Task.update(query, updTask, {}, callback);
}

module.exports.addTask = function(newTask, callback){
    newTask.save(callback);
}