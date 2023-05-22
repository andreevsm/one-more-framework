import { Component } from '@angular/core';
import { INewTask, ITask } from './task/task.model';
import { TaskService } from './task/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  get tasks$() {
    return this.taskService.tasks$;
  }

  constructor(private taskService: TaskService) {}

  public onCreateTask(newTask: INewTask): void {
    this.taskService.addTask(newTask);
  }

  public onUpdateTask(updatedTask: ITask): void {
    this.taskService.updateTask(updatedTask);
  }

  public onDeleteTask(id: number): void {
    this.taskService.deleteTask(id);
  }
}
