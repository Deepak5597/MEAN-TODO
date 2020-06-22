import { Component, OnInit, ElementRef } from '@angular/core';
import { AppService } from '../app.service';
import { Router, ActivatedRoute, RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';


@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {


  taskHeading:string;
  taskDescription:string;
  subtaskHeading:string;
  subtaskDescription:string;

  udpateSubtaskHeading:string;
  updateSubtaskDescription:string;
  updateSubtaskStatus:string;

  constructor(private _router:Router,private _appService:AppService,private _activateRoute:ActivatedRoute,private _eleRef:ElementRef){}
  
  showMainSpinner:boolean=false;
  changeSubtaskStatus(subtaskId:string,statusToChange:string){
    this.showMainSpinner  = true;
    this._appService.updateSubtaskStatus(subtaskId,statusToChange).subscribe(
      (res:any)=>{
          if(res.status == 'success'){
            this.showMainSpinner  = false;
            this.refreshSubtaskList();
          }else if(res.status == 'error'){
            this.showMainSpinner  = false;
          }
      },
      (error)=>{

      }
    )
  }

  taskData:any[]=[];
  subtaskData:any[]=[];

  selectedTaskId:string;
  selectedTaskIndex:number;
  selectedSubtaskId:string;
  ngOnInit(){
    this.taskData = this._activateRoute.snapshot.data.taskviewResolver[0].data;
	  this.subtaskData = this._activateRoute.snapshot.data.taskviewResolver[1].data;
    this._router.events.subscribe((routerEvent:RouterEvent) => {
      if (routerEvent instanceof NavigationStart) {
           this.showMainSpinner = true;
      }
  
      if (routerEvent instanceof NavigationEnd || routerEvent instanceof NavigationCancel || routerEvent instanceof NavigationError) {
        this.showMainSpinner = false;
      }
    });
    if(this.taskData.length){
      this.filterSubtask(0,this.taskData[0]._id);
    }
  }

  filteredSubtasks:any[]=[];
  filterSubtask(index:number,taskIdFromView:string){
    this.selectedTaskIndex = index;
    this.selectedTaskId = taskIdFromView;
    let returnArr:any[]=[];
      this.subtaskData.forEach(indSubtask => {
          if(indSubtask.taskId == taskIdFromView){
              returnArr.push(indSubtask);
          }
      });
    this.filteredSubtasks = returnArr;  
  }

  createnewTask(){
    this.showMainSpinner  = true;
    const payload = {
      taskName : this.taskHeading,
      taskDescription : this.taskDescription
    }
    this._appService.createNewTask(payload).subscribe(
      (res:any)=>{
          if(res.status == 'success'){
            this.showMainSpinner  = false;
            this.refreshTaskList();
          }else if(res.status == 'error'){
            this.showMainSpinner  = false;
          }
      },
      (error)=>{

      }
    )
  }

  deleteSubtask(){
    this.showMainSpinner = true;
    this._appService.deleteSubtask(this.selectedSubtaskId).subscribe(
      (res:any)=>{
          if(res.status == 'success'){
            this.showMainSpinner  = false;
            this.removeDeletedSubtask(this.selectedSubtaskId);
          }else if(res.status == 'error'){
            this.showMainSpinner  = false;
          }
      },
      (error)=>{

      }
    )
  }

  removeDeletedSubtask(subtaskId:string){
      
    for(let i=0;i<this.subtaskData.length;i++){
      if(this.subtaskData[i]._id === subtaskId){
          this.subtaskData.splice(i,1);
      }
    }
    for(let j=0;j<this.filteredSubtasks.length;j++){
      if(this.filteredSubtasks[j]._id === subtaskId){
          this.filteredSubtasks.splice(j,1);
      }
    }
  }

  refreshTaskList(){
    this.showMainSpinner  = true;
    this._appService.fetchAllTasks().subscribe(
      (res:any)=>{
        if(res.status == 'success'){
          this.showMainSpinner  = false;
          this.taskData = res.data;
        }else if(res.status == 'error'){
          this.showMainSpinner  = false;
        }
      },
      (error)=>{

      });
  }

  refreshSubtaskList(){
    this.showMainSpinner  = true;
    this._appService.fetchAllSubtask().subscribe(
    (res:any)=>{
      if(res.status == 'success'){
        this.showMainSpinner  = false;
        this.subtaskData = res.data;
        if(this.selectedTaskId != 'undefined' || this.selectedTaskId != undefined){
            this.filterSubtask(this.selectedTaskIndex,this.selectedTaskId);
        }
      }else if(res.status == 'error'){
        this.showMainSpinner  = false;
      }
    },
    (error)=>{

    });
  }

  createnewSubtask(){
    let payload = {
      "taskId":this.selectedTaskId,
      "subtaskName":this.subtaskHeading,
      "subtaskDescription":this.subtaskDescription,
      "subtaskStatus":'PENDING'
    }
    this.showMainSpinner  = true;
    this._appService.createNewSubtask(payload).subscribe(
    (res:any)=>{
      if(res.status == 'success'){
        this.showMainSpinner  = false;
        this.subtaskData = res.data;
        if(this.selectedTaskId != 'undefined' || this.selectedTaskId != undefined){
            this.refreshSubtaskList();
        }
      }else if(res.status == 'error'){
        this.showMainSpinner  = false;
      }
    },
    (error)=>{

    });
  }

  setUpdateData(subtaskId:string){
    this.selectedSubtaskId = subtaskId;
      this.subtaskData.forEach(indSubtask => {
          if(indSubtask._id == subtaskId){
            this.udpateSubtaskHeading = indSubtask.subtaskName;
            this.updateSubtaskDescription = indSubtask.subtaskDescription;
            this.updateSubtaskStatus = indSubtask.subtaskStatus
          }
      });
    this._eleRef.nativeElement.querySelector("#updateSubtaskBtn").click();  
  }


  updateSubtask(){
    let payload = {
      "subtaskId":this.selectedSubtaskId,
      "subtaskHeading":this.udpateSubtaskHeading,
      "subtaskDescription":this.updateSubtaskDescription,
      "subtaskStatus":this.updateSubtaskStatus
    }
    this.showMainSpinner  = true;
    this._appService.updateSubtask(payload).subscribe(
    (res:any)=>{
      if(res.status == 'success'){
        this.showMainSpinner  = false;
        this.subtaskData = res.data;
        if(this.selectedTaskId != 'undefined' || this.selectedTaskId != undefined){
            this.refreshSubtaskList();
        }
      }else if(res.status == 'error'){
        this.showMainSpinner  = false;
      }
    },
    (error)=>{

    });
  }
}
