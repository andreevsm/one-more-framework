import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { INewTask } from '../task.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  @Output() public createTask = new EventEmitter<INewTask>();

  public form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      description: [''],
    });
  }

  public onSubmitForm() {
    this.createTask.emit({
      ...this.form.value,
      isDone: false,
      createdAt: new Date(),
    })
  }
}
