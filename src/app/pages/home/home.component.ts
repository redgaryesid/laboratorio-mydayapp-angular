import { Component,  OnInit } from '@angular/core';

import { Task } from 'src/app/model/task.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  tasks: Task[] = [];
  type_task: string = 'all';

  constructor() { }

  ngOnInit(): void {
    const tasks = localStorage.getItem('mydayapp-angular');
    if (tasks) {
      this.tasks = JSON.parse(tasks);
    }
  }

  addTask(event: Event): void {
    const element = event.target as HTMLInputElement;
    const title = element.value.trim();
    if (title !== '') {
      const newTast = {
        id: this.tasks.length + 1,
        title: title.trim(),
        completed: false
      }
      this.tasks.push(newTast);  
      localStorage.setItem('mydayapp-angular', JSON.stringify(this.tasks));
      element.value = '';
    }
    
  }
  changuedTaskCompleted(index: number): void {
    this.tasks[index].completed = !this.tasks[index].completed;
    localStorage.setItem('mydayapp-angular', JSON.stringify(this.tasks));
  }
  changuedTaskEditing(index: number): void {
    for (let i = 0; i < this.tasks.length; i++) {
      if (i !== index) {
        this.tasks[i].editing = false;
      }
    }
    this.tasks[index].editing = !this.tasks[index].editing;
  }
  saveEditTask(event: Event, index: number): void {
    const element = event.target as HTMLInputElement;
    const title = element.value.trim();
    if (title !== '') {
      const newTast = {
       ...this.tasks[index],
        title: title.trim(),
        editing: false
      }
      this.tasks[index] = newTast;
      localStorage.setItem('mydayapp-angular', JSON.stringify(this.tasks));
    }
  }

  deleteTask(index: number): void {
    this.tasks.splice(index, 1);
    localStorage.setItem('mydayapp-angular', JSON.stringify(this.tasks));
  }
  countPendningTasks(): number {
    return this.tasks.filter(task => !task.completed).length;
  }
  clearCompleted(): void {
    this.tasks = this.tasks.filter(task => !task.completed);
    localStorage.setItem('mydayapp-angular', JSON.stringify(this.tasks));
  }
  setTypeTask(type: string): void { 
    this.type_task = type;
  }

}

