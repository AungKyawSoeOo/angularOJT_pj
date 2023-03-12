import { Component } from '@angular/core';
import { Team } from 'src/app/interfaces/team';
import { Role } from 'src/app/interfaces/role';
import { FormGroup, FormControl, Validators, AbstractControlOptions, AbstractControl,ValidationErrors } from '@angular/forms';
// import {ToastrService} from "ngx-toastr";
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],

})

export class RegisterComponent {
  constructor(private service:AuthService,private router:Router) {
    this.registerForm.controls['teamselect'].setValue(this.teams[0].value);
    this.registerForm.controls['roleselect'].setValue(this.roles[2].value);
  }
  teams: Team[] = [
    { value: 'wordpress', viewValue: 'WordPress' },
    { value: 'java', viewValue: 'Java' },
    { value: 'php', viewValue: 'PhP' },
    { value: 'nodejs', viewValue: 'NodeJs' }
  ]

  roles: Role[] = [
    { value: 'manager', viewValue: 'Manager' },
    { value: 'member', viewValue: 'Member' },
    { value: 'user', viewValue: 'User' },
  ]


  showPassword: boolean = false;
  confirmshowPassword:boolean=false;
  selectedTeam = this.teams[0].value;
  selectedRole = this.roles[2].value;
  selectedDate!: Date;
  reading = false;
  swimming = false;
  cooking = false;

  registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&].{4,7}')]),
    cpassword: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&].{4,7}')]),
    gender: new FormControl('male', Validators.required),
    teamselect: new FormControl('', Validators.required),
    roleselect: new FormControl('', Validators.required),
    picker: new FormControl('',Validators.required),
    reading: new FormControl(false),
    swimming: new FormControl(false),
    cooking: new FormControl(false)
  }, { validators:[this.passwordMatchValidator,this.checkAtLeastOneCheckbox] } as AbstractControlOptions)


  passwordMatchValidator(control: FormGroup) {
    const password = control.get('password');
    const cpassword = control.get('cpassword');
    return password && cpassword && password.value !== cpassword.value ? { passwordMismatch: true } : null;
  }

    //checkbox
    checkAtLeastOneCheckbox(control: FormGroup): ValidationErrors | null {
      const reading = control.get('reading')?.value;
      const swimming = control.get('swimming')?.value;
      const cooking = control.get('cooking')?.value;
      if (!reading && !swimming && !cooking) {
        return { atLeastOneCheckbox: true };
      }
      return null;
    }


  register() {
    console.log(this.registerForm);
    if(this.registerForm.valid){
      this.service.proceedRegister(this.registerForm.value).subscribe(res=>{
        this.router.navigate(['login']);
      })
    }else{

    }
  }

  get getName() {
    return this.registerForm.get('name');
  }

  get getEmail() {
    return this.registerForm.get('email');
  }

  get getPassword() {
    return this.registerForm.get('password');
  }

  get getConfirmPassword() {
    return this.registerForm.get('cpassword');
  }

  get getDate(){
    return this.registerForm.get('picker');
  }

  get getReading(){
    return this.registerForm.get('reading')
  }

  get getSwimming(){
    return this.registerForm.get('swimming');
  }

  get getCooking(){
    return this.registerForm.get('cooking');
  }
}
