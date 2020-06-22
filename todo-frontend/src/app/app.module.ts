import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { HttpClientModule } from '@angular/common/http';
import { TaskViewComponent } from './task-view/task-view.component';
import { TodoResolver } from './task-view/todo.resolver.service';

@NgModule({
  declarations: [
    AppComponent,
    TaskViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AppService,TodoResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
