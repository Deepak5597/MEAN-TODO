import { Resolve, ActivatedRoute } from "@angular/router";
import { Observable, of, forkJoin } from "rxjs";
import { Injectable } from "@angular/core";
import { AppService } from '../app.service';

@Injectable() 
export class TodoResolver implements Resolve<any>{

    constructor(private _appService: AppService){}

    resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot):Observable<any> {
        return forkJoin(
            this._appService.fetchAllTasks(),
            this._appService.fetchAllSubtask()
        );
    }

}
