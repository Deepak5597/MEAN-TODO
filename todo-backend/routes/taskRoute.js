const express = require('express');
const router = express.Router();

const Task = require('../models/task'); 
const responseObj = require('../models/customresponse');

//to get all tasks
router.get('/',(req,res,next)=>{
    Task.getAllTasks((err,data)=>{
        if(err){
            res.json(responseObj.customResponse('error','500','Something went wrong while getting tasks.',[]))
        }else{
            res.json(responseObj.customResponse('success','200','Task Data.',data))
        }
    });
});

//to get individual task by id
router.get('/:taskId',(req,res,next)=>{
    Task.getTaskById(req.params.taskId,(err,data)=>{
        if(err){
            res.json(responseObj.customResponse('error','500','Something went wrong while getting task by task id'));
        }else{
            res.json(responseObj.customResponse('success','200','Task Found',data));
        }
    });
});

//to create a task
router.post('/',(req,res,next)=>{
    let newTask = new Task({
        taskName : req.body.taskName,
        taskDescription : req.body.taskDescription,
    });

    Task.addNewTask(newTask,(err,data)=>{
        if(err){
            res.json(responseObj.customResponse('error','500','Something went wrong while adding'));
        }else{
            res.json(responseObj.customResponse('success','200','Task Added Successfully',data));
        }
    })
});


module.exports = router;