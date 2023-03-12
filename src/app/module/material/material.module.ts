import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';

const modules = [
  MatInputModule,
  MatRadioModule,
  MatSelectModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatButtonModule,
  MatIconModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule
]


@NgModule({

  imports: [
    modules
  ],
  exports: [
    modules
  ]
})
export class MaterialModule { }
