import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient,private router:Router) { }
  apiurl=environment.apiEndpointUser;

  getUsers(): Observable<any> {
    return this.http.get(this.apiurl);
  }

  createUser(user: any): Observable<any>{
    const now = new Date().toISOString();
    user.created_at=now;
    user.updated_at=now;
    return this.http.post(this.apiurl, user);
  }

  deleteUser(id:any):Observable<any>{
    return this.http.delete(`${this.apiurl}/${id}`);
  }
}
