import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { Team } from 'src/app/interfaces/team';
import { Role } from 'src/app/interfaces/role';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit{
  showPassword: boolean = false;
  confirmshowPassword:boolean=false;
  userForm: any = {
    name: '',
    email: '',
    password: '',
    cpassword: '',
    gender: '',
    teamselect: '',
    roleselect: '',
    picker: '',
    description:'',
    reading: false,
    swimming: false,
    cooking: false
  };
  selectedTeam!: string;
  selectedRole!:string;
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
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }


ngOnInit(): void {
  this.route.paramMap.subscribe((param) => {
    var id = Number(param.get('id'));
    this.getById(id);
  });
}

getById(id: number) {
  this.userService.getById(id).subscribe((data) => {
    this.userForm = data;
    this.selectedTeam = this.userForm.teamselect;
    this.selectedRole=this.userForm.roleselect;
    console.log(this.userForm);
  });
}
update() {
  this.userService.updateUser(this.userForm)
    .subscribe({
      next: (data) => {
        this.router.navigate(["/user_list"]);
      },
      error: (err) => {
        console.log(err);
      }
    })
}

}
