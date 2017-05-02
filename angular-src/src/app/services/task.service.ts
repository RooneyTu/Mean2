import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TaskService {
  authToken: any;
  isDev:boolean;

  constructor(private http:Http) { 
    console.log('Task service initialized...');
    this.isDev = true; // Change to false before deployment
  }

  getTasks(){
    console.log('gettasks');
    let headers = new Headers();
    this.loadToken();
    console.log(this.authToken);
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    let ep = this.prepEndpoint('api/tasks/list');
    return this.http.get(ep, {headers: headers})
        .map(res => res.json());
  }
  
  addTask(newTask){
      var headers = new Headers();
      this.loadToken();
      headers.append('Authorization', this.authToken);
      headers.append('Content-Type', 'application/json');
      let ep = this.prepEndpoint('api/tasks/add');
      return this.http.post(ep, newTask, {headers: headers})
          .map(res => res.json());
  }
  
  deleteTask(id){
      var headers = new Headers();
      this.loadToken();
      headers.append('Authorization', this.authToken);
      headers.append('Content-Type', 'application/json');
      let ep = this.prepEndpoint('api/tasks/'+id);
      return this.http.delete(ep, {headers: headers})
          .map(res => res.json());
  }
  
  updateStatus(task){
      var headers = new Headers();
      this.loadToken();
      headers.append('Authorization', this.authToken);
      headers.append('Content-Type', 'application/json');
      let ep = this.prepEndpoint('api/tasks/'+task._id);
      return this.http.put(ep, task, {headers: headers})
          .map(res => res.json());
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  prepEndpoint(ep){
    if(this.isDev){
      return ep;
    } else {
      return 'http://localhost:8080/'+ep;
    }
  }

}
