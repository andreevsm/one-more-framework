import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { INewTask, ITask } from "./task.model";

let id = 0;

@Injectable({ providedIn: 'root' })
export class TaskService {

  private tasks$$ = new BehaviorSubject<ITask[]>([]);

  public get tasks$() {
    return this.tasks$$.asObservable();
  }

  public addTask(newTask: INewTask): void {
    this.tasks$$.next([ { ...newTask, id: ++id }, ...this.tasks$$.getValue()])
  }

  public deleteTask(id: number) {
    const tasks = this.tasks$$.getValue().filter(task => task.id !== id);

    this.tasks$$.next(tasks);
  }

  public updateTask(updatedTask: ITask) {
    const tasks = this.tasks$$.getValue().map(task => task.id === updatedTask.id ? { ...updatedTask } : task)

    this.tasks$$.next(tasks);
  }
}
