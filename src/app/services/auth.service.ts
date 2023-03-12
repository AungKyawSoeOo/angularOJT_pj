import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private http:HttpClient,private router:Router) { }
  apiurl=environment.apiEndpoint;
    proceedRegister(inputdata:any){
      const now = new Date().toISOString();
      inputdata.created_at = now;
      inputdata.updated_at = now;
      return this.http.post(this.apiurl,inputdata);
    }

    proceedLogin(email: any, password: any) {
      return this.http.get(this.apiurl + '/?email=' + email + '&password=' + password);
    }

    logout() {
      localStorage.removeItem('email');
      localStorage.removeItem('password');
      this.router.navigate(['/login']);
    }
}
