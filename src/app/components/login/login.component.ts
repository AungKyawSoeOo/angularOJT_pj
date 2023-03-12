import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  userdata:any;
  hidePassword=true;
  isLoggedIn = false;
  constructor(private service:AuthService,private route:Router){}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)])
  });

  login() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.service.proceedLogin(email, password).subscribe((res: any) => {
      this.userdata=res;
      if (res.length > 0) {
        console.log(this.userdata[0].email);
        // Login successful
        localStorage.setItem('email',this.userdata[0].email);
        localStorage.setItem('password',this.userdata[0].password);
        console.log('User logged in:', res[0]);
        this.route.navigate(['add_user'])
      } else {
        // Login failed
        console.log('Invalid email or password');
      }
    });
  }

  get getEmail() {
    return this.loginForm.get('email');
  }

  get getPassword() {
    return this.loginForm.get('password');
  }
}
