import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class AppService{

    constructor(private _http:HttpClient){
    }

    httpOptions:any = new HttpHeaders({
        'Accept': 'application/json',
        "Access-Control-Allow-Origin":"*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
    });

    fetchAllTasks(){
        return this._http.get(environment.taskBaseUrl,this.httpOptions);
    }

    fetchAllSubtask(){
        return this._http.get(environment.subtaskBaseUrl,this.httpOptions);
    }

    createNewTask(payload:any){
        return this._http.post(environment.taskBaseUrl,payload,this.httpOptions);
    }  

    createNewSubtask(payload:any){
        return this._http.post(environment.subtaskBaseUrl,payload,this.httpOptions);
    }  

    deleteSubtask(subtaskId:string){
        return this._http.delete(environment.subtaskBaseUrl+'/'+subtaskId);
    }  

    updateSubtaskStatus(subtaskId:string,subtaskStatus:string){
        return this._http.put(environment.subtaskBaseUrl + '/' +subtaskId + '/' +subtaskStatus,{},this.httpOptions);
    }

    updateSubtask(payload:any){
        return this._http.put(environment.subtaskBaseUrl + '/updateSubtask',payload,this.httpOptions);
    }
}