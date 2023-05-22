import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ITask } from '../task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnChanges{

  @Input() tasks!: ITask[]

  @Output() updateTask = new EventEmitter<ITask>();
  @Output() deleteTask = new EventEmitter<number>();

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.tasks);
  }
}
