import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskViewComponent } from './task-view/task-view.component';
import { TodoResolver } from './task-view/todo.resolver.service';

const routes: Routes = [

  {
    path:'',
    component: TaskViewComponent,
    resolve : { taskviewResolver : TodoResolver}
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
