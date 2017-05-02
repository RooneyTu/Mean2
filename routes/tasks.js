const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Task = require('../models/task');

// Get All Tasks
router.get('/list', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    let user = req.user;
    console.log(user);
    Task.getTasks(user, (err, tasks) => {
        if(err){
            res.json({success: false, msg: "Failed to get all tasks"});
        }else{
            res.json({success: true, data: tasks});
        }
    });
})

// Get Single Task
router.get('/:id', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    console.log('Get Single Task');
    let user = req.user;
    Task.getTaskById(user, req.params.id, (err, task) => {
        if(err){
            res.json({success: false, msg: "Failed to get single task"});
        }else{
            res.json({success: true, data: task});
        }
    })
}) 

//Add New Task
router.post('/add', passport.authenticate('jwt', {session:false}), function(req, res, next){
    let user = req.user;
    let newTask = new Task({
        title: req.body.title,
        isDone: req.body.isDone,
        userId: user._id
    });

    Task.addTask(newTask, function(err, task){
        if(err){
            res.json({
                success: false,
                msg: "Can't save"
            });
        }
        res.json({success:true, data: task});
    });
});

// Delete Task
router.delete('/:id', passport.authenticate('jwt', {session:false}), function(req, res, next){
    let user = req.user;
    Task.deleteTaskById(user, req.params.id, function(err, task){
        if(err){
            res.json({
                success: false,
                msg: "Can't delete"
            });
        }
        res.json({success:true, data: task});
    });
});

// Update Task
router.put('/:id', passport.authenticate('jwt', {session:false}), function(req, res, next){
    let user = req.user;
    var task = req.body;
    var updTask = {};
    if(task.isDone){
        updTask.isDone = task.isDone;
    }
    
    if(task.title){
        updTask.title = task.title;
    }

    if(!updTask){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    } else {
        Task.updateTaskById(user, req.params.id, updTask, function(err, task){
            if(err){
                throw err;
            }
            return res.json({success:true, data: task});
        });
    }
});

module.exports = router;
