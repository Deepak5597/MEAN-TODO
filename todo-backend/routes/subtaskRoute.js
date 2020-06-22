const express = require('express');
const responseObj = require('../models/customresponse');
const router = express.Router();

const Subtask = require('../models/subtask');


router.get('/',(req,res,next)=>{
    Subtask.getAllSubtask((err,data)=>{
        if(err){
            res.json(responseObj.customResponse('error','500','Something went wrong while getting subtasks.',[]));
        }else{
            res.json(responseObj.customResponse('success','200','Subask Data.',data));
        }
    })
});

router.get('/:taskId',(req,res,next)=>{
    Subtask.getSubtaskByTaskid(req.params.taskId,(err,data)=>{
        if(err){
            res.json(responseObj.customResponse('error','500','Something went wrong while getting subtasks.',[]));
        }else{
            res.json(responseObj.customResponse('success','200','Subask Data.',data));
        }
    })
});

router.post('/',(req,res,next)=>{
    let newSubtask= new Subtask({
        "taskId":req.body.taskId,
        "subtaskName":req.body.subtaskName,
        "subtaskDescription":req.body.subtaskDescription,
        "subtaskStatus":req.body.subtaskStatus
    });
    Subtask.addSubtask(newSubtask,(err,data)=>{
        if(err){
            res.json(responseObj.customResponse('error','500','Something went wrong while adding subtasks.',[]));
        }else{
            res.json(responseObj.customResponse('success','200','Subtask added successfully.',data));
        }
    });
});


router.put('/:subtaskId/:subtaskStatus',(req,res,next)=>{
    Subtask.updateSubtaskStatus(req.params.subtaskId,req.params.subtaskStatus,(err,data)=>{
        if(err){
            res.json(responseObj.customResponse('error','500','Something went wrong while updating subtasks.',[]));
        }else{
            res.json(responseObj.customResponse('success','200','Subtask updated successfully.',data));
        }
    });
});

router.delete('/:subtaskId',(req,res,next)=>{
    Subtask.deleteSubtask(req.params.subtaskId,(err)=>{
        if(err){
            res.json(responseObj.customResponse('error','500','Something went wrong while deleting subtasks.',[]));
        }else{
            res.json(responseObj.customResponse('success','200','Subtask deleted successfully.',[]));
        }
    });
});

router.put('/updateSubtask',(req,res,next)=>{
    let query = {
        "subtaskName":req.body.subtaskHeading,
        "subtaskDescription":req.body.subtaskDescription,
        "subtaskStatus":req.body.subtaskStatus
      }
    Subtask.updateSubtask(req.body.subtaskId,query,(err,data)=>{
        if(err){
            res.json(responseObj.customResponse('error','500','Something went wrong while updating subtasks.',[]));
        }else{
            res.json(responseObj.customResponse('success','200','Subtask updated successfully.',data));
        }
    });
});
module.exports = router;