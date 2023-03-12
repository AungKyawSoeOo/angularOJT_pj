import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './module/material/material.module';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core'
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_DATE_FORMATS } from './date';
import { LoginComponent } from './components/login/login.component';
import {HttpClientModule} from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { AddUserComponent } from './components/add-user/add-user.component';
import { HeaderComponent } from './components/header/header.component';
import { UserListComponent } from './components/user-list/user-list.component';
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    AddUserComponent,
    HeaderComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatNativeDateModule,
    HttpClientModule,
    ToastrModule.forRoot(
      {
        timeOut: 3000,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
        closeButton: true,
        progressAnimation: 'increasing',
        progressBar: true
      }
    )
  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
