import { Component, OnInit,ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { User } from 'src/app/interfaces/user';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit{
  // users: any[]=[];
  subscription!: Subscription;
  dataSource!: MatTableDataSource<User>;
  displayedColumns: string[] = ['name','gender','team','hobby','dob','createdAt','actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public datePipe = new DatePipe('en-US');


  constructor(private userService: UserService) { }
  userData:any;
  undeletedData!: any[];
  ngOnInit(): void {
    this.subscription = this.userService.getUsers().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.userData = data;
        this.undeletedData = data.filter((item:any) => !item.deleted);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  // this.userService.getAllUsers().subscribe(data => {
  //   this.data = data;
  //   this.undeletedData = data.filter(item => !item.deleted); // Filter out the deleted items
  // });


  deleteUser(user: any) {
    let result = confirm(`Are you sure to delete ${user.name}`);
    if (result) {
      this.userService.deleteUser(user.id).subscribe({
        next: (data) => {
          user.deleted = true;
          this.userData = this.userData.filter((item:any) => !item.deleted);
          this.dataSource.data = this.userData;
          this.undeletedData = this.userData.filter((item:any) => !item.deleted);
        }
      })
    }
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
