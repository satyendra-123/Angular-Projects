import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ManageEmpComponent } from './manage-emp/manage-emp.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EmpService } from './service/emp.service';

@NgModule({
  declarations: [HomeComponent, SignUpComponent, ManageEmpComponent],
  imports: [
    CommonModule,    
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers:[EmpService]
})
export class HomeModule { }
