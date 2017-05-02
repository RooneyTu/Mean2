import { Component, OnInit } from '@angular/core';
import {TaskService} from '../../services/task.service'
import {Router} from '@angular/router';
import {Task} from '../../models/Task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  tasks: Task[];
  title: string;

  constructor(private taskService:TaskService, private router:Router) { }

  ngOnInit() {
    this.taskService.getTasks().subscribe( tasks => {
      console.log(tasks);
      this.tasks = tasks.data;
    },
    err => {
      console.log(err);
      return false;
    });
  }

  addTask(event){
        event.preventDefault();
        var newTask = {
            title: this.title,
            isDone: false
        }
        
        this.taskService.addTask(newTask)
            .subscribe(task => {
                console.log(task.data);
                this.tasks.push(task.data);
                this.title = '';
            });
    }
    
    deleteTask(id){
        var tasks = this.tasks;
        
        this.taskService.deleteTask(id).subscribe(data => {
            if(data.data.n == 1){
                for(var i = 0;i < tasks.length;i++){
                    if(tasks[i]._id == id){
                        tasks.splice(i, 1);
                    }
                }
            }
        });
    }
    
    updateStatus(task){
        var _task = {
            _id:task._id,
            title: task.title,
            isDone: !task.isDone
        };
        
        this.taskService.updateStatus(_task).subscribe(data => {
            task.isDone = !task.isDone;
        });
    }

}
